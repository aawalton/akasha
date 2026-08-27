---
id: c824727f-b17c-51df-8c82-28c4276b296a
slug: inference-upscale-body-cannot-move
page-type-slug: finding
title: "Inference upscale body cannot move"
domain-slug: domain/ops-cli
---

# Claim

`ops inference upscale` is the one verb in the `inference` namespace whose body cannot move to the instructions repository without editing the code repository, because the workstation half of its dispatch is three unexported functions and one of them derives a path from `import.meta.dir`.

# Evidence

Observed 2026-08-13 while running `domains/tasks/ops/move-command-bodies.md` over the `inference` namespace. The other nine verbs calling `runCodeVerb` moved and landed at `8fcd7fe5b`; this one was left delegating.

`packages/infra/inference/src/cli/upscale.ts` exports `resolveUpscaleHost`, `resolveUpscaleHome` and `buildUpscaleScriptArgs`, all pure and all unit-tested in the sibling `upscale.unit.test.ts`. It does NOT export `runWorkstationUpscale`, `runUpscaleBin` or `upscaleBinPath`. The `--host workstation` arm of the verb runs entirely inside those three.

`upscaleBinPath` is `join(import.meta.dir, "..", "..", "..", "upscale", "bin", scriptName)`. Resolved from the code repository that reaches `packages/infra/upscale/bin/`. Resolved from `tools/commands/inference/upscale.ts` in the instructions repository it reaches nothing, so the body cannot be transcribed as it stands — it would have to spell the path through `codeRoot()`, which puts a filesystem reach at a deployed artifact into this repository.

`@infra/upscale`'s `package.json` exports exactly one subpath, `./k8s/serving-job`. The workstation substrate is bash under `bin/` with no TypeScript entry point, so there is no exported capability to call instead. The cluster half is fine — `runClusterUpscale` is exported from `cli/upscale-cluster.ts`.

So the three routes are: export `runWorkstationUpscale` from the code repository (an edit there, which the task's own invariant forbids), reimplement the bash spawn here against `codeRoot()`, or leave the verb delegating. The third was taken.

Not established: whether the workstation arm is still wanted at all. It is described in the verb's own help as a retained opt-in behind a cluster default (#14626), so it may be that the arm retires rather than moves, and the verb then moves whole.
