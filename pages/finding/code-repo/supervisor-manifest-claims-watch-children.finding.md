---
id: 9246bef4-518b-591d-ac42-a86f1eb83f61
page-type-slug: finding
title: "Supervisor manifest claims watch children"
domain-slug: repo/code-repo
---

# Claim

The CI orchestrator's k8s manifest says in three places that the worker supervisor spawns its children under `bun --watch`. It does not, and never may. One of the three is the stated reason the supervisor pod is the only container in the repository that opts out of `readOnlyRootFilesystem`.

# Evidence

At `~/code` on `main`, `13135651993c19af09ce41b6295264191071d3c1`, three statements in the manifest tier:

- `k8s/synth-deployment.ts:124` — "The children are spawned under `--watch` by the supervisor, so hot-reload still works end-to-end."
- `k8s/synth-deployment.ts:301-303` — "`readOnlyRootFilesystem` is intentionally NOT set — `Bun.spawn` of `bun --watch` children needs writable paths under the working tree (the watcher writes restart cookies)."
- `k8s/synth.ts:21-22` — the supervisor "in turn `Bun.spawn`s sibling business processes under `--watch`: the orchestrator dispatcher loop, merge-queue coordinator, ci-pod-reaper loop, and other reactors".

The spawn is at `packages/shared/worker-supervisor/src/child-lifecycle.ts:115`, `cmd: ["bun", spec.scriptPath]`, and it is the only one. Three live surfaces say it must stay that way. `supervisor.ts:18-21`: "Production code never runs under `--watch` — neither the supervisor nor its children — because `bun --watch` wrappers in containers exit with SIGKILL (code=137) on internal restart, indistinguishable from a real crash and triggering an unwanted respawn cycle." `supervisor.unit.test.ts:135` pins it in CI, `expect(cmdline).not.toContain("--watch")`. And `synth-deployment.ts:120`, four lines above the first stale sentence and inside the same comment block, states the supervisor half correctly.

The security half is what makes this worth more than tidiness. Every other container synth in the tree sets `readOnlyRootFilesystem: true` — `packages/infra/auth-proxy/k8s/synth.ts:302`, `packages/infra/k8s-types/src/orchestrator-cache.ts:248` and `:366`, and the four product web deployments. The supervisor pod is the single opt-out, and the writable root it buys is justified by watcher restart cookies that no process writes. So a control is disabled for a mechanism that does not run, and nobody re-testing the exemption will find that out from the comment explaining it.

Found ingesting a quarantined question document, which named the first two statements and not the third.
