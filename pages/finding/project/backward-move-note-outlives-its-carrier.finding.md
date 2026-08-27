---
id: 701f6fae-cc90-5052-8efd-5bc01458b1d6
page-type-slug: finding
title: "Backward move note outlives its carrier"
domain-slug: barred-meaning/project
---

# Claim

Three live prose surfaces in `~/code` tell a reader that `ops project move-to` records a backward move as a `MOVE-BACKWARD:` line appended to the row's `notes`. The verb has not done that for some time: `buildBackwardMoveRecord` returns a structured `backwardMove` attribute and `parseBackwardMove` reads one, and nothing appends a note. One of the three is the verb's own `--help`, which states both the live form and the removed one in the same string.

# Evidence

The live carrier, read as executable text rather than as a comment. `packages/alanwalton/projects/cli/src/pure/build-backward-move-record.ts:95-99` is `buildBackwardMoveRecord`, returning `{ at, fromStatus: from, toStatus: to, track }` or `null`; lines 64-71 declare `BackwardMoveSchema` as a strict object over `at`, `fromStatus`, `toStatus`, `track`; lines 77-80 are `parseBackwardMove`, which boundary-parses "a row's untyped `backwardMove` attribute". The same file's line 10 records the change deliberately: "WHY A FIELD AND NOT A NOTE. It was a `MOVE-BACKWARD:` line appended to `notes`."

The three surfaces that still name the removed form, from `rg -n 'MOVE-BACKWARD'` over `~/code` (bare, tracked, four files):

- `packages/alanwalton/projects/core/src/lib/custody-transfer.ts:25` — "`MOVE-BACKWARD:` line stating the direction it observed, and that record is correct as".
- `packages/alanwalton/projects/core/src/lib/ruling-record.ts:311` — "A return already has two records on the row: the `MOVE-BACKWARD:` line".
- `packages/alanwalton/projects/cli/src/project/move-to.ts:82`, inside the `--help` body a user reads — "It does not restate the `MOVE-BACKWARD:` record above". Line 80 of that same help string is correct, saying the verb records the move "in the row's `backwardMove` attribute naming both ends, the ladder that made it backward, and when". So one help output carries both descriptions and does not agree with itself.

Why the shape matters. Cross-checking prose against prose returns agreement here: the quarantined head document `dirty/code/packages-alanwalton-projects-core-claude.md` said the same thing at its line 40 ("records the DIRECTION it observed as a `MOVE-BACKWARD:` line in the row's notes"), and so do two docblocks and half a help string. Four prose surfaces, one habit, all stale in the same direction. Only the function bodies disagree.

Found while ingesting that document; the observation is about the live code and outlives the sweep, which is why it is filed here rather than left in the ingest report.
