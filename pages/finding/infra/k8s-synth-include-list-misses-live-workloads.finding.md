---
id: 2568bf06-c941-5563-aca7-4781eec8fe8b
page-type-slug: finding
title: "K8s synth include list misses live workloads"
domain-slug: domain/global
---

# Claim

`packages/infra/k8s/tsconfig.json` names the files it compiles one at a time rather than by a glob, so a file nobody remembered to add to that list is compiled by nothing. Fifty-four non-test sources in the package that synthesises the cluster belong to no TypeScript project: among them the synth for four live workloads, seventeen `rbac.ts` and twenty-four `foundation.workflow.ts`.

# Evidence

Measured 2026-08-10 at 23:05Z against `/home/walton/code` at dd27605962.

METHOD. Every tsconfig declaring `include` or `files` was resolved with `--showConfig`, which expands the globs without building, and the union compared against every `.ts` on disk under `packages/`. A file in the union is compiled by SOME project, so a file covered elsewhere cannot read as uncovered. 386 projects weighed, 13,408 on disk, 12,762 resolved.

The first run reported zero uncovered and was wrong: it matched `tsconfig.base.json`, which declares no `include` and so defaults to everything beneath it, and that one extends-target absorbed the tree. Base configs are excluded above.

POSITIVE CONTROL. The twelve files under `packages/infra/seaweedfs/k8s/`, established by hand as belonging to no project, all appear in the result.

RESULT. 1,759 files are in no project, 214 of them not tests; the test share is largely deliberate, most configs carrying `exclude: ["**/*.test.ts"]`.

`packages/infra/k8s` holds 54 of the 214, the largest concentration in the repository: 24 `foundation.workflow.ts`, 17 `rbac.ts`, 4 `synth.ts`, and 9 others including `cloudflared/discover-routes.ts` and `postgres/cnpg-cluster-steps.ts`.

The four uncompiled synths are `pod-janitor/synth.ts`, `tailnet-egress/synth.ts`, `postgres/gfs-promoter/k8s/synth.ts` and `postgres/stats-bridger/k8s/synth.ts`. pod-janitor runs as a live CronJob; its completions are visible in the cluster.

THE MECHANISM. That tsconfig's `include` is a hand-maintained list of roughly eighty-five explicit paths. A component added to the package is invisible to the compiler until somebody adds its line, and nothing reports the omission — the list reads as coverage, and its length reads as thoroughness. `pod-janitor`, `tailnet-egress`, `collections`, `ci-images` and `temper-watcher` have directories here and no entries in it.

NOT MEASURED. Whether type errors stand in any of the 54. The 160 non-test orphans outside this package, spanning `packages/temper/game` (47), `packages/temper/addons` (19) and eleven more.
