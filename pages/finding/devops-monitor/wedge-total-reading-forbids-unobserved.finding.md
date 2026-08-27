---
id: ed03c484-48e6-587d-88c9-9b87e6549ac4
page-type-slug: finding
title: "Wedge total reading forbids unobserved"
domain-slug: domain/global
---

# Claim

Two of the devops monitor's ten classes are declared as always deciding, and a test enforces that they may never render `unobserved`. Both read inputs that can no longer be observed. A class structurally forbidden from saying "I could not see" says "fine" instead, so the declaration meant to stop it declining has become the mechanism of a false all-clear.

Whether declaring a class that way is ever right is the decision here. It is not a defect to patch.

# Evidence

Measured 2026-08-20, by running the classifiers against the live database rather than reading them.

`tools/lib/devops-monitor/wedges/reachability.ts:12,16` declares `dispatcher-liveness` and `landed-no-main-pipeline` as `{ kind: "total" }`. `tools/tests/devops-monitor-reachability.test.ts:65-67` asserts of every such class that `render(unobservedSnapshot()).state` is `not.toBe("unobserved")`, under the name "decides on a wholly unobserved snapshot rather than declining".

Their inputs cannot express absence. `landed-no-main-pipeline` reads `snapshot.recentBatches` and `snapshot.coveredMainShas`, both non-nullable on the `Snapshot` type. `dispatcher-liveness` reads `snapshot.dispatchingBacklog` through `staleDispatchingOffenders`, which opens `for (const step of backlog ?? [])`.

Run against live data with the `pipeline`, `step` and `merge-queue-batch` page-type rows gone, both render `clear`. `dispatcher-liveness` renders `state: clear` while its own evidence carries `"dispatcherAlive": false` beside `"staleCount": 0`. It establishes that the dispatcher is dead and calls the condition clear, because wedging requires `offenders.length > 0 && !dispatcherAlive` and the offender list can no longer be filled.

The pattern that answers this stands two files away. `tools/lib/devops-monitor/wedges/seat-derivation-coverage.ts:12` returns `unobservedBecause("no live seat to measure a derivation over")` when its list is empty, rather than reading an empty list as a healthy one. Nothing needs inventing.

That three states are meant to be three readings is already asserted at `devops-monitor-reachability.test.ts:81`: an unobserved merge queue and a healthy one must not produce the same verdict. It holds for `dispatch-stall` and is defeated for these two.

Not measured: `served-artifact-divergence`, declared `derived`, also rendered `clear` in the same run, and was not traced to its source.
