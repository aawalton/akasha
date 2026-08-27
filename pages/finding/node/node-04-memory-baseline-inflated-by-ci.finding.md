---
id: 224ae82c-ddeb-5647-8ff0-c8828ca53cff
slug: node-04-memory-baseline-inflated-by-ci
page-type-slug: finding
title: "Node 04 memory baseline inflated by CI"
domain-slug: domain/node
---

# Claim

A finding that node-04 sits at 98% memory as steady state was itself wrong: both baseline reads were taken while a 4Gi CI typecheck step was resident, and the true non-CI baseline is ~53% (serve 22%, SeaweedFS 23%, system 8%), leaving ~5.1Gi headroom; the serve-app rollout surge deadlock is a placement collision between CI work and the sole serve-class node, not chronic capacity scarcity.

# Evidence

Project #16325 (domain: node, status: someday_maybe, live-on: deploy). No objective; moved off retired `notes`, 2026-08-15.

SUPERSEDED: filing asserted node-04 sits at 93-98% memory steady-state. Wrong — both baseline reads were taken while a 4Gi CI typecheck step was resident (19:47:57Z-~22:42Z). True non-CI baseline: ~53% (serve 22%, SeaweedFS 23%, system 8%), ~5.1Gi headroom, room for 6+ concurrent 768Mi surges. The surge deadlock is not chronic; the fix is placement, not capacity. Do not trim the CI step's 4Gi request — deliberate #15576 tuning sized to its ~3.1Gi peak; cutting it buys OOMKills.

Original arithmetic: node-04 is the only node with `alanwalton.com/workload-class.serve=true` (verified by label query). Requests 15154Mi = 98% allocatable, re-measured steady after two rollouts completed. Rollout is surge-then-terminate; each serve pod requests 768Mi. Surge supply 1 app at a time; demand 5 (alanwalton/atlas, alanwalton/web, archive-of-worlds/web, audhdalan/web, temper/web) — serialize, loser blows the 3-min rollout-wait ceiling.

Observed: pipeline 25978, `archive-of-worlds/web-6dccf646d4-nw4fv` Pending 13 min, scheduled 90s after temper/web released exactly 768Mi.

Presents as mystery: renders as plain FAILED WORKFLOW, self-retracts (25978, 25981 failed→resolved 21:45:10Z) over a window not predictable from the row (athena: 1.5h on 25942; 25978: ~7min). 3+ agents debugged their own change over it one evening.

Compounding: 6Gi of node-04 was CI-class work at peak — `check-typesafety-bundle` 4Gi/114min + `ci-storage-maintain` 2Gi = 39% of allocatable. #16287's branch-CI re-ranking toward node-06 relieves 6Gi measured at peak.

Mirror of #16288: there a class grew 1→4 members so the pin stopped pinning; here the class has exactly 1 member so the pin cannot yield.
