---
id: b13a4b8c-1e04-5906-a102-efa333a597dc
slug: a-pod-program-launched-from-an-in-memory-job-manifest-reads-as-unreached
page-type-slug: finding
title: "A pod program launched from an in memory job manifest reads as unreached"
domain-slug: domain/global
---

# Claim

`@infra/ci-benchmark` reads as unreached by the off-workstation walk and is deployed: `benchmark-run.ts` runs inside a Kubernetes Job on a cluster node. The Job manifest is built in memory and applied, never written as a file, so no `k8s-resource` or `pod-program` root reaches it. It is one of the sixty packages the walk now reports unreached, and at least that one is a false positive.

# Evidence

The manifest builder now stands at `tools/lib/benchmark-job.ts`, and its runner at `tools/lib/benchmark/run.ts` — `RUNNER_PATH` at `benchmark-job.ts:25`, the `exec bun` line at `:125`. It builds the container command as a shell script and ends it:

    const RUNNER_PATH = "packages/infra/ci/benchmark/src/benchmark-run.ts"
    ...
    `exec bun ${RUNNER_PATH} --sha "$TARGET_SHA" --node "$NODE_NAME" --store "$STORE"`,
    ].join("\n")
    return ["/bin/sh", "-c", script]

`buildBenchmarkJob` returns that as a Job manifest object, which `ops pipeline benchmark` (`tools/commands/pipeline/benchmark.ts:101`) applies. There is no `deploy/` directory under the package and no generated yaml: the manifest exists only in memory, so the two root classes that reach a pod's program — `k8s-resource` off a manifest `path` and `pod-program` off the repo paths a pod runs, at `infra/cluster-checks/src/lib/off-workstation-roots.ts:173` and `:181` — have no file to read.

The path itself is a literal const, not composed. What the walk cannot see is not the string but the Job: nothing on disk says this program is a pod's.

Confirmed against the reading at `29e4c78ac34b`: `@infra/ci-benchmark` is in `unreachedPackages`, `unreachedPackages.length` is 60, `degradedRootClasses` is empty, and the population is 376.

This bears on how the sixty are read. `pages/finding/code-check/sixty-packages-unreached-once-the-dead-dependency-list-went.finding.md` files them as undecided, and this is the first one checked by hand — it turned out deployed. The set cannot be worked package by package on the reading alone; each needs a check against pod commands built at run time.

It also bears on a boundary judgment already made. `bootstrap-workflow`, now at `tools/lib/bootstrap-workflow/index.ts:37`, exports `runWorkflow`, which the benchmark runner imports at `tools/lib/benchmark/run.ts:2`, and project #19228 holds it in the code repository for that reason. The reason is sound and the stated ground was not: it was written as "the benchmark imports it" when what makes it binding is that a deployed pod program does.

`runWorkflow` is not bootstrap's. It executes a workflow without the pipeline engine — bootstrap uses it to boot that engine, the benchmark uses it to run the check registry in a cold pod. Its file name says otherwise, which is why a shared executor reads as a bootstrap helper.
