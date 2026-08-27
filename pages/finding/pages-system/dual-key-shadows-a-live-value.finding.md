---
id: 0b51fd02-d673-5297-81eb-4eb3dc9d5137
slug: dual-key-shadows-a-live-value
page-type-slug: finding
title: "Dual key shadows a live value"
domain-slug: domain/pages-system
---

# Claim

The dual-key convention lets one row hold two answers under one property, and both instruments admit it by design. `story-chapter` `019ec829-d5ee-7100-ade3-a53e796c67a1` carries a superseded 23 KB draft under a definition UUID key beside the live `text`, and a `status` of `drafting` beside the live `review`.

# Evidence

Read 2026-08-07. `ops page show 019ec829-d5ee-7100-ade3-a53e796c67a1` prints `status review`, `wordCount 3487` and three UUID keys: `019ea257-10ae-7528-8fb5-9131077de668` holding prose, `019db533-f3a3-7087-8694-01518386bd28` holding `drafting`, `019db533-f3a2-7dd7-bd9f-ac330df61568` holding `1`.

The two prose values are different drafts of the same chapter. The live `text` opens "The coffee machine still worked, which should have told me something" and is first person; the UUID-keyed value opens "The coffee machine was still working, which was the first lie" and is third person, at about 23,070 bytes against the live 18,580. `~/books/tower-of-nimue/chapters/001-the-first-hour.md` is 18,749 bytes, first person, `wordCount: 3487` — so the on-disk source of truth matches the LIVE key, and the UUID-keyed third-person draft exists nowhere else. The row's `sourcePath` still names it, and authored story content left `~/code` for the books repo at `8f5703e6de` (#17765).

Neither instrument can report this, and both say so deliberately. `_page_undeclared_attributes.audit.sql:19-22`: "a row may key a value by the definition's stringId ... or by the definition row's UUID ... Both count as declared." `_enforce_declared_attributes.ts` is the write-time twin and matches the same way — "matched dual-key on element `id` (the slug) or `pageId` (the definition row's UUID)" — and its header states the two "must agree, or a write passes what the deploy gate then reports". They agree, so the shadowing key is legal on both.

Searched `~/memory/findings/` for `019ea257|019ec829|tower-of-nimue|stale draft|dual-key` (Grep tool, multiline, case-insensitive): no matches across the 49 findings under `pages-system` or anywhere else.
