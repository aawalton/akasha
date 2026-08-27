---
id: 841c7f81-28d9-5b73-955a-61523f7b57ad
slug: batch-size-shape-declared-twice
page-type-slug: finding
title: "Batch size shape declared twice"
domain-slug: domain/global
---

# Claim

Two declarations of the merge-queue batch-size constants shape now stand in this repository.
`tools/commands/merge-queue/resume.ts` declares a file-local `Constants` interface naming
`BATCH_SIZE_MIN`, and `tools/lib/merge-queue-code.ts` exports `batchSizeBounds()` over a
`BatchSizeBounds` interface naming `BATCH_SIZE_MIN` and `BATCH_SIZE_MAX`. Both resolve the same
module. The second was added for `set-batch-size` without rewiring the first, which stands as
already-proved work.

# Evidence

`tools/commands/merge-queue/resume.ts` carries `const CONSTANTS = "@infra/ci-merge-queue-coordinator/constants"`
and `interface Constants { readonly BATCH_SIZE_MIN: number }`, reaching it as
`await codeModule<Constants>(CONSTANTS)`.

`tools/lib/merge-queue-code.ts` now carries the same specifier and
`interface BatchSizeBounds { readonly BATCH_SIZE_MIN: number; readonly BATCH_SIZE_MAX: number }`,
reached as `batchSizeBounds()`. `tools/commands/merge-queue/set-batch-size.ts` uses it.

The two agree today: both name the same module and read the same field, and `BatchSizeBounds` is a
superset. Nothing reports the pair, and a change to how the bounds are reached would have to find
both sites.

Rewiring `resume.ts` onto `batchSizeBounds()` was deliberately not done here: it is a verb another
seat landed and proved tonight, and editing it under a different verb's port would put a second
change inside the first. It is left as an observation rather than a repair.
