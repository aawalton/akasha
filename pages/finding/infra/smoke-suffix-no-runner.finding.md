---
id: 98e993df-675b-5403-9514-8889b4471a31
slug: smoke-suffix-no-runner
page-type-slug: finding
title: "Smoke suffix no runner"
domain-slug: domain/global
---

# Claim

Two comments in `packages/infra/tests` assign the `smoke` test suffix to a deploy-time runner that no step selects. `run-workspace-tests.sh` routes `smoke`, with `browser` and `model`, to "a pre/post-deploy step", and `select-slow-suites.ts` excludes it from the workstation gate as "(deploy-time)". Nothing in the tree selects `.smoke.test.`, so a reader of either comment concludes a smoke suite is exercised at deploy and therefore does not run it by hand.

# Evidence

Read at `origin/main` `13135651993c19af09ce41b6295264191071d3c1`.

`packages/infra/tests/run-workspace-tests.sh:53-59` — "CI runs `*.{unit,property,component}.test.*` … The other seven types (`database`, `smoke`, `integration`, `browser`, `cli`, `data`, `model`) are CI-incompatible by design and never run in CI; each is invoked from the workstation touched-file slow-suite gate (`database`/`integration`/`data`/`cli`) or a pre/post-deploy step (`browser`/`smoke`/`model`)."

`packages/infra/tests/src/select-slow-suites.ts:29-39` — "`browser` is deliberately excluded … as are `model` (never-automated) and `smoke` (deploy-time)", above `export const SLOW_TEST_SUFFIXES = ["integration", "data", "cli", "database"] as const`. So `smoke` is out of the gate on the stated ground that deploy runs it.

Nothing runs it. `git ls-files | grep -c "\.smoke\.test\."` returns 24 tracked suites. A case-insensitive grep for `smoke` across every `*.sh`, `*.yml` and `*.yaml` in the tree returns no runner, glob or step naming the suffix — only unrelated GPU-toolkit scripts (`ai-toolkit-smoke.sh`, `wan-smoke.sh`, `upscale-smoke.sh`, `zimage-smoke.sh`), their config comments, and `talos/smoke/hello-pod.yaml`.

The deploy verb's smoke-named steps are not selections over the suffix. `packages/alanwalton/projects/cli/src/lib/move-to-deploy-render-gate-preland.ts` is the pre-land render-gate smoke and drives `verify-render`; `move-to-deploy-shell-suite-postland.ts` is its post-land counterpart. Neither reads a test-type suffix.

`ops tests run <path…>` (`run-named-suites.ts`) does group named files by type, `smoke` among them — but it runs what a caller names, which is not a selection.

`packages/infra/checks/src/lib/test-step-paths.unit.test.ts:119` states it from the other side, listing `packages/a/x.smoke.test.ts` among the paths the step builder ignores.

Filed while ingesting `dirty/questions/code-repo-source-comment-reach.md`, whose third entry recorded this and was cut as not being instruction. That document is queued for removal, so the observation would have gone with the sweep.
