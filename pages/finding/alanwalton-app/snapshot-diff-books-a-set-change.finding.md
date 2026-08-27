---
id: 993b1155-e8bf-570b-ac32-9e4b8de74961
page-type-slug: finding
title: "Snapshot diff books a set change"
domain-slug: domain/alanwalton-app
---

# Claim

Both of the estate's snapshot-diff faucets book a set-membership change as one day's activity. `computeWordsReadDelta` and `computeFunDelta` each derive a day's points as `S - priorSnapshot` floored at zero, which guards a dip and nothing else. Nova's `S` sums chapter progress over a curated reading list, so adding a story that already carries progress makes `S` jump by its whole accumulated total and today's row books it as reading done today. Neither docblock mentions the set changing.

# Evidence

`packages/alanwalton/nova-words-read/src/pure/compute-words-read-delta.ts:43-45` is the whole computation: `wordsReadPoints = priorSnapshot === undefined ? Math.max(0, s) : Math.max(0, s - priorSnapshot)`, returning `wordsReadSnapshot: s`. `packages/alanwalton/fun-points/src/pure/compute-fun-delta.ts` is the same shape, and the nova docblock says so — "exactly the snapshot-and-diff shape the Fun-axis completion faucet uses".

The floor is the only guard, and both docblocks show it was reasoned about in the downward direction alone. Nova's: floored at zero "so a never-decreasing read total can never produce a negative day", applied "to a monotonically-growing read total". Fun's: the floor is "a defensive guard against a transient partial index read momentarily lowering `S`. A dip stamps the lower score, so the recovery gain is booked on the next rebuild." An upward jump is mentioned in neither, and a floor at zero does not bound one.

The set is curated and can gain a complete member. `reconcile-nova-words-read.ts` computes `S` as the sum of every `story-chapter.progress` whose parent story is one of Nova's reading-list `reading-story` rows, scoped in memory against `readingStoryIds`, with a comment noting "130+ reading-stories". Adding one already carrying progress raises `S` with no reading having happened, and the next pass books the difference as that day's delta. Growth from reading and growth from a membership change are the same number in the diff.

The repaired shape already exists as a first-class faucet kind: `faucet-engine.ts` carries `kind: "windowed"` with aggregates `bytes`, `sum` and `count` over dated source rows, windowing per-event dates instead of differencing a standing total. These two faucets are the ones not using it.

Duplicate check, run as its own call before filing: `rg -uuu -in "snapshot.diff|set change|membership|already.complete|reading.list"` over `findings/alanwalton-app/` returns nothing, exit 1.
