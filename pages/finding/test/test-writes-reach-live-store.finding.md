---
page-type-slug: finding
slug: test-writes-reach-live-store
title: "An on-demand test's writes land in the live page store"
domain-slug: domain/test
---

# Claim

An on-demand test's writes land in the live page store and are committed and pushed from it. `tools/tests/food-log-half-write.on-demand.test.ts` spawns `ops food log` against the working repository, so every run creates `food-entry` pages under `pages/food-entry/`, patches the current day's real `daily-tracking` and `persona-day` roll-ups, and lands each write as its own pushed commit. Pages from earlier runs stand in the store now, and the roll-up values accumulate across runs rather than being recomputed from the entries that remain.

Three things that would each have stopped it do not reach it. The guard `refuseALiveTestWrite` belongs to `@shared/pages-query` and names that module in its own refusal; this write goes through `tools/lib/page-query-client.ts`, which carries no live-service guard at all. And the guard's own test detection keys on `Bun.main` ending `.test.ts`, which a spawned subprocess replaces with the CLI's path, so it could not fire across the spawn even where it did apply.

Nothing the test asserts observes the store, so the run's verdict is the same whether the writes land or not. A test that writes into a store it does not measure reports nothing about having done so.

# Evidence

Observed on 2026-08-27 while repointing old-layout paths under `tools/tests`, after runs of this suite were traced to commits landing in `pages/food-entry`.

The mechanism was read rather than inferred. `refuseALiveTestWrite` stands at `shared/pages-query/src/index.ts:178-183` and is called from `attemptWrite` at line 192 under `writingLiveFromATest(fetcher)`. That predicate, at `shared/pages-query/src/index.ts:35-40`, returns false unless `Bun.main` matches `/\.test\.tsx?$/`. The test spawns its subject at `tools/tests/food-log-half-write.on-demand.test.ts:111-112` as `bun tools/ops/cli.ts food log --title "Fixture broccoli" --plant-grams 40`, so `Bun.main` in the writing process is the CLI rather than a test file. `tools/lib/page-query-client.ts` carries no reference to that guard nor to any test-context check.

Each run writes one page per case and patches the day's two roll-ups, each as a separate commit. The roll-up fields observed moving were `nutrition-points` and `health-points` on the daily-tracking page and `source-points` on the persona-day page; each rose with successive runs and did not fall when entries were removed, so the value is not derived from the entries standing at the time it is read.

Not measured: whether any other test under `tools/tests` reaches the store the same way, only this one having been traced. Whether anything reads the fixture pages that accumulate. Whether `ops food log` is the only write command reachable from a test across a spawn. Whether a later legitimate run of the roll-up would correct the drifted values or carry them forward.

Not repaired. The pages this agent's own runs created were removed and the two roll-ups restored to what git held from before them; the guard gap itself is untouched, and the test still writes to the live store on every run.
