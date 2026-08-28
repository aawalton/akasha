---
page-type-slug: finding
title: "Rebuild holds spend the landing budget"
domain-slug: pages-index
---

# Claim

Landings now queue behind rebuilds on a lock that did not exist before 2026-08-28, and a rebuild's hold spends a real share of the budget a landing has to acquire the landing lock.

A landing takes the index lock for 154 to 247ms. A rebuild takes the same lock for 488 to 1048ms. A landing that arrives while a rebuild holds it waits for the rebuild, and while waiting it is holding the per-repository landing lock, whose acquisition ceiling for the next landing is 2000ms.

So the worst observed chain — a rebuild at 1048ms, one landing ahead at 247ms, and the landing's own 247ms — is about 1.5s of a 2.0s ceiling. That is inside the budget and no refusal has been observed, but the margin is 0.5s and it did not exist at all before the lock was introduced.

# Evidence

Measured against live traffic of roughly eleven commits per minute from other agents, not in a quiet tree, and reported as the worst case rather than the mean.

Holds were timed by watching `.git/pages/index.lock` come and go at 1ms resolution and reading the holder mark inside it, so each hold is attributed to a pid. Rebuild holds were correlated to their own `ops index refresh` by wall-clock window rather than assumed, because other agents run refreshes too and an uncorrelated maximum picks up theirs.

Six refreshes at 03:06:22 through 03:08:52 on 2026-08-28, each matched to the hold ending inside its window: 677, 491, 919, 488, 506 and 1048ms. Median about 590ms, worst 1048ms. The spread is not noise — the short holds are refreshes that found nothing had moved during their walk, and the long ones are refreshes that had landings to apply on top, which is real index work proportional to how much landed during the five seconds the walk takes.

Landing holds in the same window: 160, 163, 164, 167, 168, 176, 177, 179, 183, 183, 186, 187, 188, 189, 207, 210, 212ms. Across all windows observed this session the range is 154 to 247ms.

The 2000ms figure is `LANDING_WAIT_MS` at `tools/lib/page-commit-queue.ts:16`, passed as `waitMs` from `drainRoot` at line 206 into `whileHoldingLanding`, which at `repo/git/git.ts:141` sets `const until = Date.now() + ceilingMs` and spins to acquire the per-repository landing lock until then. So it bounds acquisition by the next landing, not the hold of the current one.

The index lock's own budget is 8000ms (`INDEX_WAIT_MS` in `page/index/store/store.ts`), which nothing observed comes near.

Not measured: the depth of the landing queue behind a rebuild under heavier traffic than eleven commits per minute. At that rate arrivals are about 0.18/s and a 1s hold accumulates well under one waiter, so the chain above is constructed from the worst single values rather than observed as one event.
