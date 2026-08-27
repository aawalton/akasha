---
id: e432588d-0de4-5b04-9b83-e2e4e1cfae72
page-type-slug: finding
title: "Step cost window cannot reach a checks life"
domain-slug: domain/global
---

# Claim

A review's "it has never refused" is a claim about days rather than a check's life, because `ops pipeline step-cost` caps at 200 runs. Eight of eleven pending reviews hit it: 27.5 hours of a 14-day life, 3 days of a life since 2026-06-21, 16 days of four months, 4 days of one since 2026-05-27. Each reviewer states the horizon honestly and must weigh the check on it anyway. One instrument defect rather than eight review defects, bearing on the removal call in every review now being written.

# Evidence

Found by reading eleven pending reviews together rather than one at a time, which is the only way it is visible: each states its own horizon correctly and no single one looks defective. The windows, as each reviewer stated them:

  check-seat-resume-driver     200 runs = 27.5 hours, check landed 2026-07-28
  check-service-typecheck      200 runs = 3 days, step live since 2026-06-21
  check-shellcheck             200 runs = 16 days, check landed 2026-03-15
  check-spec-bundle            200 runs = 4 days, check landed 2026-05-27
  check-sargable-pages-predicates  38 days of a 60-day life
  check-emitted-path-citations 3.5 days, about a quarter of its life
  check-commands-kept          3.6 days of a life beginning 2026-08-06
  check-sops-manifests         window opens 2026-06-01, check landed 2026-04-25

Only `check-spacing-scale` and `check-source-position-citations` escape it, both because those checks are days old.

WHY IT IS NOT MERELY A CAVEAT. `review-check` weighs what a check prevents against what it costs, and "has it ever refused" is direct evidence for the first. A check that refused twice in four months and none in the sampled fortnight reads identically to one that has never fired. No reviewer is getting this wrong: each states its horizon per the Horizon rule and must render a recommendation on it anyway.

The busier the check, the worse the coverage — `check-service-typecheck` burns 200 runs in three days while a loosely-gating check gets months from the same 200. So the reach is shortest exactly where the check is dearest and the removal question most valuable.

Either repair answers it for every check at once, which is why this stands as a unit rather than in each review: a `step-cost` reaching past 200 runs, or a stored refusal count per step. The second is what a reviewer wants — nobody needs 4,000 timings, they need how many times this has ever refused.
