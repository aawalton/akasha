---
id: 6254999d-b946-5a85-8130-6f9a88d662da
page-type-slug: finding
title: "A code-repo file named as a raw string in a workflow template reads as dead code"
domain-slug: repo/instructions-repo
---

# Claim

And the migrated workflow templates under `pages/workflow-template/` name code-repo files as raw
strings inside shell commands, which resolve only when the CI pod runs the step.

The consequence is that a code-repo file can be load-bearing for the instructions repo
while every instrument in the code repo reports it as unreferenced.

# Evidence

Taken on 2026-08-23 against the code repo at branch `change-19458`, one commit after
`9d39e29699` removed `packages/infra/workflow-dsl` and 51 `*.workflow.ts` files.

Six code-repo files are named as raw strings inside migrated workflow templates and
run in a CI pod rather than being imported anywhere:

    packages/infra/checks/src/checks/check-build-graph.ts
    packages/infra/checks/src/checks/check-workflow-surface.ts
    packages/infra/checks/src/run-check.ts
    packages/infra/ci/pipeline/src/lib/write-changed-files.ts
    packages/infra/ci/pipeline/src/lib/write-configs-cache.ts
    packages/infra/ci/workflows/src/generate-rbac.ts

`pages/workflow-template/workflow-preparation.declaration.attachment.ts:206` runs
`bun packages/infra/ci/pipeline/src/lib/write-configs-cache.ts`. That file has no
importer inside the code repo, so an import search reports it as dead; it is not.
