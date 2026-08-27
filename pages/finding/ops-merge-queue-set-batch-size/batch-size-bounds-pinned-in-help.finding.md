---
id: aa6e632e-f5fd-5723-b272-9645e88d90cd
page-type-slug: finding
title: "Batch size bounds pinned in help"
domain-slug: domain/global
---

# Claim

`ops merge-queue set-batch-size` spells its batch-size bounds as the literal `[1, 8]` in its help
block, where the code repository interpolated `BATCH_SIZE_MIN` and `BATCH_SIZE_MAX`. Both are
declared flat, so the literal is faithful today; raising either would leave the help advertising a
bound the verb no longer enforces. The enforcement itself does not drift — the moved body reads both
constants live, so the help text alone is pinned.

# Evidence

`packages/infra/ci/merge-queue/coordinator/src/coordinator/constants.ts` declares
`BATCH_SIZE_MIN = 1` and `BATCH_SIZE_MAX = 8` as flat exports.

The code repository's `set-batch-size.ts` help block built its positional description as
`` `New batchSize value (integer in [${BATCH_SIZE_MIN}, ${BATCH_SIZE_MAX}])` ``. A help block
cannot await, and resolving a capability there would open a database to print `--help`, so the
moved surface at `tools/commands/merge-queue/set-batch-size.ts` spells `[1, 8]`.

Two further copies of the same bound already stood hand-written in the code repository before the
move, so the pinned surface is wider than what the move added: the help description prose reads
"(currently 1..8)", and the registry summary reads "rejects values outside [1, BATCH_SIZE_MAX]" with
the constant's NAME as literal text.

The body was proved to track the live constants: `ops merge-queue set-batch-size 9` refuses with
`<n> must be an integer in [1, 8] (got "9")`, byte-identical across the pre-move and post-move
surfaces, and that message is built from the `codeModule`-resolved values rather than from a literal.
