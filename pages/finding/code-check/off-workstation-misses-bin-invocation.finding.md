---
id: 5e521768-80a7-55bd-888a-496ea893e837
page-type-slug: finding
title: "Off workstation misses bin invocation"
domain-slug: domain/global
---

# Claim

`ops graph off-workstation` reports `@shared/cli` as unreached, and `@shared/cli` is `ops` itself, which CI runs on every pipeline and a CronJob pod spawns — so the verb's one headline case, the package Alan had already ruled on by hand, is a false negative.

# Evidence

Observed 2026-08-11, on the deployed verb, immediately after #18789 handed back. Run at main `2534e0b33b15`, no flags, output captured as JSON.

The run reports 394 packages, 170 reached, 224 unreached. `@shared/cli` stands in `unreachedPackages`.

`node_modules/.bin/ops` resolves to `packages/shared/cli/src/ops/cli.ts`, so `@shared/cli` is the `ops` binary. Two off-workstation sites invoke it, both read directly:

- `packages/infra/ci/workflows/src/prep.workflow.ts:243-254`, the CI step `preparation-synth-k8s`, `alwaysRun: true`, running `bun ops k8s synth --write` on every pipeline.
- `packages/infra/ci/orphaned-resources-sweep/src/run-orphan-sweep-and-notify.ts:75`, `Bun.spawn(["bun", "ops", "k8s", "orphaned-resources", "--json"])`, inside a CronJob pod.

Neither is visible to the walk. #18789 resolves roots through file paths — a workflow's `sourcePath`, a k8s manifest `path`, and a scan collecting `packages/…/*.ts` strings named in a document. An invocation spelling a bin name rather than a path matches none of those. This is a fourth defect of the class the hand-back already named, all of them under-reporting reach.

The class is narrow rather than broad. Nineteen workspace bin names belong to packages on the unreached list; of those, only `ops` is named anywhere under `packages/infra/ci`, a `k8s/` directory or a `deploy/` directory. So the other 223 entries are not impugned by this mechanism.

How it survived the hand-back: the report names `@agents/cli` as "`ops` itself". `@agents/cli` is a dependency of `@shared/cli` carrying the agent verbs, not the binary. Both read unreached, so the sentence looked confirmed either way, and the case checked was the one already believed.

Not established: whether any root class beyond bin-name invocation is also missed. Only this one was traced.
