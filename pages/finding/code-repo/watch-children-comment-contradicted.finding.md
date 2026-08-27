---
id: f29fb7d7-943e-5364-ab3a-2f7a82f84b0b
page-type-slug: finding
title: "Watch children comment contradicted"
domain-slug: repo/code-repo
---

# Claim

Two live files disagree about whether the worker-supervisor spawns its children under `bun --watch`. `packages/infra/ci/orchestrator/k8s/synth-deployment.ts:124` says "The children are spawned under `--watch` by the supervisor, so hot-reload still works end-to-end"; `packages/shared/worker-supervisor/src/supervisor.ts:18` says production code never runs under `--watch`, "neither the supervisor nor its children". The spawn agrees with the second.

# Evidence

Read against `~/code` on 2026-08-07; I did not record the sha.

`synth-deployment.ts:118-125` comments the orchestrator deployment's container, whose `command` two lines below is `["bun", orchestratorCacheEntrypointPath("packages/shared/worker-supervisor/src/main.ts")]` — so it describes this same supervisor. It gives the watch split as the reason the supervisor itself is unwatched: watching the parent "would cause cascading restarts on every source change. The children are spawned under `--watch` by the supervisor, so hot-reload still works end-to-end."

`supervisor.ts:18-21` gives the opposite, with its own reason: `bun --watch` wrappers in containers exit with SIGKILL (137) on internal restart, "indistinguishable from a real crash and triggering an unwanted respawn cycle".

`child-lifecycle.ts:115` spawns `cmd: ["bun", spec.scriptPath]`, and `supervisor.unit.test.ts:135` asserts `expect(cmdline).not.toContain("--watch")`, listed in that file's docblock among the invariants it pins. `spawn-reresolve.unit.test.ts` expects `["bun", newPath]` on three paths. So the second file and the test describe the shipped behaviour and the deployment comment does not.

Not measured: I did not run the suite, and did not search for a second spawn path that might add the flag.

Found while ingesting `dirty/questions/worker-doctrine.md`, whose last entry offers the no-`--watch` claim as a candidate unit.
