---
id: 9e82becb-7cc5-539e-beee-04fb6afa5f78
page-type-slug: finding
title: "Addon bundle reuse unmeasured in pipeline"
domain-slug: domain/global
---

# Claim

Nothing but a dispatched pipeline can observe that the addon bundle is now built once per run rather than twice. The reuse path, its ordering edge onto `check-addon-build` and the per-app memory reservations are all observable on a workstation, and all three were. The effect they exist for is not: `check-app-build-temper-web` dropping from roughly 41s toward 6s on the first run where `check-addon-build` is selected, and the five light steps scheduling against 1500Mi rather than 2Gi.

# Evidence

Verified in `/home/walton/worktrees/18484` while rendering the verdict on project 18383, which landed the reuse as `9bdf5692b`.

Synthesizing the `check` workflow in place gives 6 app-build steps: five at `cpu=2000m mem=1500Mi limit=4Gi` with no `dependsOn` and no reuse flag, and `check-app-build-temper-web` at `mem=2Gi` with `dependsOn=["check-addon-build"]` and `TEMPER_ADDON_BUNDLE_REUSE_DIST=1`.

Running `build-addon-bundle.ts` in place against a populated `packages/temper/addons/dist/` reports `0 built, 15 reused from dist/` in 0.33s wall. With the flag unset the same invocation takes the compile path.

Both readings are of a workstation, not a pipeline. Neither says what the step costs on a CI node under contention, and neither says whether the dispatcher packs the five light steps any differently. The tree carrying this child, project 18484, deploys over a branch and a CI run, so the first pipeline after that deploy is where both numbers can be read — and nothing schedules that reading.
