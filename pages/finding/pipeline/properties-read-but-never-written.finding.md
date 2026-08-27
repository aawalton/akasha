---
id: 6ad9eba3-194c-5ba8-845e-47f891f1b4bd
page-type-slug: finding
title: "CI properties read but never written"
domain-slug: page-type/pipeline
---

# Claim

Three attributes on the CI page types have a reader and no writer, so every read of them returns nothing and has done for as long as the rows show. Each reader is live code making a decision or printing a display on a value that is never there.

# Evidence

Measured 2026-08-19, while settling which properties survive the move to file-backed pages under `define-domain-structure`.

`pipeline.onlyCheckNames` is read by `packages/infra/ci/worker/src/reactors/sweep-config.ts` and by `packages/shared/pages/access/src/pg/find-completed-pipeline-by-tree-sha.ts`. `pipeline.prevPassSkips` is read by `packages/infra/ci/worker/src/pure/decide-pipeline.ts`. Neither is set on any of 800 pipeline rows sampled most-recently-updated-first, and the only writer of pipeline attributes, `trigger_pipeline.sql`, writes neither.

`workflow.blockedSteps` is read and displayed by `tools/commands/pipeline/workflows.ts`. That command's own help states that no write path produces the attribute at all. It is set on none of 800 workflow rows.

Two readings, and nothing distinguishes them:

- The writers were removed and the readers left behind, in which case each read is dead weight and the decisions they feed are running on a default nobody chose.
- The writers were never built and the readers are speculative, in which case the same holds with no regression to point at.

Either way a reader that cannot succeed reads as working code, because a missing attribute and an empty one are the same value here.

None of the three is being carried into the file-backed page types, so a decision to keep them means writing the property definition as well as the writer.

Not measured: whether the decisions those readers feed are wrong without the value, or merely unaffected. `decide-pipeline.ts` was not traced past the read.
