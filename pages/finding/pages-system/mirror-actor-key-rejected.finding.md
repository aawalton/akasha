---
id: 5f8015a0-93ba-5218-8fca-bb92d78c845d
slug: mirror-actor-key-rejected
page-type-slug: finding
title: "Mirror actor key rejected"
domain-slug: domain/pages-system
---

# Claim

Back-relation mirror updates are dropped for every page write made on an authenticated session. `PageRelationMirrorPendingPayloadZ` is `.strict()` and declares no `actor`, while the sink writing the event merges one onto `data` whenever the session carries a user JWT — so the applier's `safeParse` rejects the row, the cursor advances, and the back-relation is never written. Writes on a service-role session carry no `actor` and parse, so every test passes while the app's own traffic does not.

# Evidence

Read in `~/code` at 2026-08-07.

`packages/shared/pages/events/src/page-relation-mirror.ts:35` declares the schema as `.strict()` over exactly `type`, `rowId`, `tableName`, `sourceId`, `targetId`, `backKey`, `backKind`, `action`. No `actor`. Its header states the intent: keep `.strict()` "so any future drift between producer and consumer parses loud rather than silently accepting `.passthrough()`".

`_pages_emit_db_result.sql` writes `elided || public._page_event_actor()` into `data`. `_page_event_actor.sql` returns `jsonb_build_object('actor', s.sub)` where `coalesce(nullif(current_setting('request.jwt.claim.sub', true), ''), nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')` is non-empty, and `'{}'` otherwise.

`packages/shared/pages/access/src/pg/page-proc-ctx/pg.ts` routes `emitRelationMirrorEvent` through that same sink, so a mirror event's `data` is merged like any other page event.

That the merge fires on a real session is pinned rather than inferred: `.../page-proc-ctx/_pages_emit_db_result.equiv.database.test.ts:187`, named "authenticated JWT sub → data carries actor (both arms)", asserts `data.actor` equals the sub after the write.

`packages/shared/pages/relation-mirror-applier/src/manifest.ts:80` is the only parse site in the repo — a search for the schema name returns the declaration, the barrel re-export and this call. It returns `{ skipped }` rather than throwing, deliberately, so one poison row cannot freeze the fleet's cursor. The consequence here is that a uniformly rejected row class is indistinguishable from an empty stream.

What hides it: `manifest.unit.test.ts` builds events through a local `makeEvent(data, seq)`, so every payload it parses is hand-written and carries no `actor`. The one test observing a real emitted row asserts on `actor` directly and never parses it with the applier's schema. Both instruments are green.
