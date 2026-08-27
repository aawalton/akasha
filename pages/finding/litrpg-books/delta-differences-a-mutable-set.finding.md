---
id: d5f34b48-aedc-5f3a-afcf-899c47ac49b3
slug: delta-differences-a-mutable-set
page-type-slug: finding
title: "Delta differences a mutable set"
domain-slug: domain/litrpg-books
---

# Claim

Nova's daily reading faucet differences a cumulative sum taken over a MUTABLE set, so adding an already-read story to her reading list books that story's whole history as one day's reading. The live `daily-tracking` rows carry two such days: 20,316,673 words on 2026-06-27 and 14,472,834 on 2026-07-14, worth 203 and 145 green days against her live 100,000 bar. Nothing reports it: the pass is idempotent and her total is written through a high-water guard, so a spike is permanent.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/persona-craft/economy-decisions-fun-words.md`, whose Nova entry names the 2026-07-14 jump. That source is queued for removal, so this re-establishes it.

The mechanism, from its docblock at `packages/alanwalton/nova-words-read/src/actions/reconcile-nova-words-read.ts`: the pass "Reads the live cumulative WORDS-READ standing score `S` — the sum of every `story-chapter.progress` whose parent `story` is one of Nova's reading-list `reading-story` rows — snapshot-and-diffs it against prior `daily-tracking` rows". The summed set is defined by list membership, so S moves when the LIST moves and the diff cannot tell that from reading.

The live rows, via `ops page list --type daily-tracking --properties date,wordsReadPoints,wordsReadSnapshot --limit 300 --json` (42 rows carry the fields):

    2026-06-27  points 20,316,673  snapshot 20,316,673
    2026-07-11  points    118,367  snapshot 20,490,618
    2026-07-14  points 14,472,834  snapshot 34,963,452
    2026-07-16  points    170,159  snapshot 35,133,611

The 2026-07-14 row is the list change: the snapshot steps 20.5M to 35.0M in one day. The 2026-06-27 row is the same shape at seeding. Ordinary days around them run 70k–170k. Her live `greenDayPoints` is 100,000 and `totalPoints` 35,501,675.

Why nothing surfaces it. The docblock states the pass is idempotent and that "the persona write is a high-water decision against the live `S`, not against the daily delta", so the inflated cumulative never falls. A very large day and a very large reading day are the same row.

A dated alternative exists on the rows already read. `story-chapter` defines 60 properties including `completedAt`, and across 500 sampled rows 143 carry it against 142 carrying `progress`, so windowing over dated completions covers essentially the set already summed.

Not established: whether the two spikes are the only ones. I did not reconstruct list membership at any past date.
