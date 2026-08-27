---
id: 92dea1b7-b686-59fd-aeb6-3a74361b3691
slug: sources-compiled-by-nothing
page-type-slug: finding
title: "Sources compiled by nothing"
domain-slug: domain/global
---

# Claim

Roughly two hundred non-test TypeScript sources repo-wide belong to no project the typecheck builds, so nothing compiles them and a type error in them is not a failure anywhere.

Among them are about sixteen cluster synth sources and a dozen workflow files — the kinds that render Kubernetes manifests and CI steps. One such file shipped `kubectl -n undefined` against a cluster-scoped resource and was found only when a glob finally pulled it into a project.

# Evidence

Measured 2026-08-11 at 02:55Z on main at `62c95a8f8015`, by expanding every tracked `tsconfig` through `tsc --showConfig` and holding the union against tracked `.ts`/`.tsx` excluding tests, `.d.ts`, `dist` and `generated`.

READING: 202 uncovered of 10,286 non-test sources, over 435 configs expanded. By area: 80 `infra/checks`, 19 `temper/addons`, 16 `temper/shared`, 10 `shared/pages`, 9 each in `automation/orchestrator`, `infra/ci`, `infra/scripts` and `temper/game`. By kind: 16 `synth*.ts`, 12 `*.workflow.ts`.

CORROBORATED. The seat on #18600 measured the same population independently with its own instrument and reported 171, and six areas agree to the file — `temper/addons` 19, `shared/pages` 10, and 9 each in four packages.

THE 202 IS AN UPPER BOUND. Eight configs still fail to expand, so every file they resolve is wrongly counted uncovered; the true figure is at most 202 and the divergence from 171 is consistent with that. The two readings agree on order of magnitude and on shape, not on a single number.

A FIRST ATTEMPT AT THIS READ 1399 AND WAS WRONG, worth recording because it failed the way instruments do. Hand-rolled JSONC comment stripping treated the `/*` in the path alias `"@/*": ["./src/*"]` as a comment opener and consumed the rest of the file, breaking 41 configs whose resolved files then read as uncovered. It printed a full-looking denominator throughout. It was caught only because a control area independently measured at 0 was checked, and because the failure count was printed beside the result rather than swallowed.

NOT MEASURED. Which of the 202 are dead code rather than live but uncompiled. Whether any carries a real type error today — coverage was measured, not correctness. Why the remaining 8 configs fail. How long the population has stood.
