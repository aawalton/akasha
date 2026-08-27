---
id: d7b16f1f-2ecb-5cd9-887d-cd0649066d7a
slug: live-walk-timeout-raised-not-fixed
page-type-slug: finding
title: "Live walk timeout raised not fixed"
domain-slug: domain/global
---

# Claim

`LIVE_WALK_TIMEOUT_MS` in `packages/agents/shared/project-binding.unit.test.ts` was raised from 60s to 240s to stop a CI timeout, and the walk it bounds wants one batched call rather than a wider bound.

# Evidence

Measured 2026-08-12 under #18834.

The walk did not run in CI at all until #18846 made the instructions tree readable to a run. On its first CI exposure it timed out at exactly 60001ms in pipeline 27881. The same walk measures 29.1s on this workstation, so the bound was not wrong by a small margin — CI is roughly four times slower at it than the machine the number was chosen on.

Raising the bound cleared the red and left the cost. The walk issues one call per subject where the population is known up front, so a batched call is what removes the duration rather than accommodating it. A 240s bound also stops reporting: a regression that doubles the walk now passes.

Landed as a repair by the #18834 seat because it reddened that row's CI, and named there as a plaster rather than a fix. Nobody owns the batched call.
