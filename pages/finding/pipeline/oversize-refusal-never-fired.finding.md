---
id: 10dbe06b-5af1-5403-99b0-cc0524b34176
slug: oversize-refusal-never-fired
page-type-slug: finding
title: "Oversize refusal never fired"
domain-slug: page-type/pipeline
---

# Claim

The guard that turns a step script past the kernel's per-argument cap into a step that fails carrying its reason has never run outside a unit test. It is deployed, and the one workflow that produced an oversized script no longer produces one, so nothing in production has dispatched the case it exists to catch and what is known about it under a real pod is what its tests assert.

# Evidence

WHAT IS DEPLOYED. `buildEntrypointShell` in `packages/infra/ci/orchestrator/src/ci-pod-dispatcher/pod-spec-entrypoint.ts` measures the script it assembled and, past `MAX_ARG_STRLEN` (131072), assembles a different one that echoes the size and the cap and exits 5, keeping the step-started and step-complete callbacks. It landed in `4f81b24e0e` on 2026-08-14. On 2026-08-16 the running dispatcher's checkout carries it: `grep -rl MAX_ARG_STRLEN /app/repo` inside the `worker-supervisor` pod names that file, and the refusal's own sentence reads back out of it.

WHY IT CANNOT FIRE TODAY. The oversized script was prep's, and prep now reads the changed-file list from the pipeline row rather than carrying it. `grep -rn changedFiles packages/infra/ci/workflows/src/*.ts` outside the tests leaves one use in a command array, an `echo` of the count. So firing the guard needs some future step's script to grow past the cap, which is the condition it was written for.

WHAT THE TESTS COVER AND WHAT THEY DO NOT. `pod-spec-entrypoint-size.unit.test.ts` asserts the bytes of the script the builder returns. A pod has never been dispatched with that script, so nothing has observed the refusal exec, post its callbacks and leave the step at a terminal failure, which is the whole of what the second objective of #19152 asked for.

NOT MEASURED. Whether any step script currently sits near the cap, and whether a refusing pod's callbacks reach the row as the ordinary ones do.
