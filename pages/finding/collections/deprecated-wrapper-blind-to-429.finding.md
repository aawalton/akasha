---
id: 33e138d6-eca2-5fca-922c-2142cf2b3347
slug: deprecated-wrapper-blind-to-429
page-type-slug: finding
title: "Deprecated wrapper blind to 429"
domain-slug: domain/collections
---

# Claim

The Spotify exercise harness cannot report success while a withdrawn browse endpoint answers 429.

`browse.ts:125` tolerates only `new Set([403, 404])`, so `attemptDeprecated` at `browse.ts:132-142` rethrows a 429 instead of recording the deprecation it is, and `harness.ts:150` then exits non-zero — while `harness.ts:13-14` calls the harness "usable as a smoke gate".

The only surviving record that two browse endpoints answer 429 is a quarantined document being deleted.

# Evidence

Read in `~/code` at the working tree of `origin/main`. Every site opened directly rather than inferred from a comment.

`packages/collections/music/spotify/src/endpoints/browse.ts:125` — `const DEPRECATED_STATUSES = new Set([403, 404])`. `browse.ts:132` exports `attemptDeprecated(path)`, whose body at `browse.ts:139` matches only across that set and otherwise rethrows.

`packages/collections/music/spotify/src/harness.ts:150` — `process.exit(failed.length > 0 ? 1 : 0)`. The smoke-gate sentence is at `harness.ts:13-14`.

`client.ts:62` — `MAX_RATE_LIMIT_RETRIES = 1`; `client.ts:60` — `MAX_RETRY_AFTER_MS = 60_000`, above which a back-off is thrown rather than slept on. So a 429 does reach the caller as a thrown error.

WHAT I DID NOT VERIFY: that `GET /browse/featured-playlists` and `GET /browse/categories/{id}/playlists` answer 429 today. That is a measurement from two live `bun run exercise` runs dated 2026-06-18 and 2026-06-20, recorded in `dirty/code/packages-collections-music-spotify-docs-api-coverage.md` at revision `ba5878d65b300570458049b9132e83366765ebb0`, lines 83-84 and 112-114. Confirming it needs a live authenticated run against Spotify, which I did not make. The code half above is verified; the antecedent is that document's claim.

That document states the consequence in its own words at lines 112-114: "Fully-removed browse playlist endpoints now answer 429 rather than 403; the `attemptDeprecated` wrapper records 403 but lets the 429 surface, so the headless smoke shows these as failures."

Duplicate search: `rg -l -i -F "attemptDeprecated"` and `rg -l -i -F "DEPRECATED_STATUSES"` over `~/memory/findings/` both exit 1. `find ~/memory/findings -iname '*429*' -o -iname '*deprecated*' -o -iname '*smoke*' -o -iname '*rate-limit*'` returned three files, all opened: two concern `*.smoke.test.ts` suffix routing in `packages/infra/tests`, one concerns dangling citations. None is this subject.
