---
id: dd21f9f2-7907-5e9e-ac92-b9085dfd7a51
page-type-slug: finding
title: "Step selection unexplained"
domain-slug: domain/global
---

# Claim

Nothing reports why a pipeline step was selected, so a check running on a change set that cannot affect it is indistinguishable from one that had to run.

# Evidence

Measured 2026-08-05 against branch pipeline 27064 (`project-17856`), whose five commits touched thirteen files: twelve under `packages/infra/checks` and one at `packages/alanwalton/projects/core/lib/project-status-variants.ts`.

`check-app-build-temper-web` dispatched on that crossing at 101.1s duration and 33.4s solo — the only check on the pipeline holding the wall clock open alone, so it is the single largest lever on branch crossing time. Three sibling app builds dispatched with it, about 146s of step time between the four.

Its `watchNodes` are `package:@temper/web` and `ts-file:packages/infra/checks/src/lib/check-configs-app-build.ts`. The branch changed neither: the one file it touched in that directory is `check-configs.ts`. It declares no `alwaysRun` and no `closurePolicy`, so the default `pkg-depends` walk applies — declared `dependencies` plus `devDependencies`, per `check-configs-types.ts` lines 65 to 79. Read out of `packages/temper/web/package.json`, those are `@infra/k8s-types` and `@infra/workflow-dsl` in dependencies, and no `@infra/` or `@alanwalton/` entry in devDependencies. No declared edge reaches anything the branch changed.

So the step ran and the closure does not explain it. Two candidates remain and I could separate neither: a `diffBase` wider than the branch's own commits, which is the same three-dot mechanism project #14695 documents from the correctness side and would over-select here rather than under-select, or a force-keep applied outside the check's own config.

`ops pipeline perf` reports what each step COST. `ops pipeline show` does not report a diff base. Searching `ops --help` surfaced no verb answering why a step was selected. The estate's whole check cost model is selection, and selection is the one thing no instrument reads back.

NOT MEASURED: whether this generalises. I traced one step on one crossing; how often app builds wake on unrelated change sets is a question about pipeline histories, which I did not read.
