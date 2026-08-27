---
id: 295197da-6a71-5a9b-ada8-752e5d2bb89f
slug: code-input-error-is-named-where-three-refusals-are-needed
page-type-slug: finding
title: "Code input error is named where three refusals are needed"
domain-slug: domain/ops-cli
---

# Claim

`tools/lib/code-input-error.ts` says in its own header that nothing new imports it, and it re-exports `inputError` from `tools/lib/code-errors.ts`. Seats are still being sent to it by name for refusals. A body needing a data or operational refusal beside an input one cannot get all three from it, so the instruction and the file disagree about which path a moved body should take.

# Evidence

Found 2026-08-13 by the seat moving the `zimage`, `image`, `complexity`, `spec` and `package` bodies, which was told in its dispatch to use `tools/lib/code-input-error.ts` for refusals.

Two of the twelve verbs need more than an input refusal. `tools/commands/spec/check.ts` raises all three: input for a path that is not there or holds no `.fizz` files, data for a spec that violated an invariant, operational for a `fizz` subprocess that crashed — the exit codes 1, 2 and 3 its own help block declares. `tools/commands/package/move.ts` raises the same three plus `isDataError` to rethrow a refusal a capability already carried.

Both were written against `tools/lib/code-errors.ts`, which is what `code-input-error.ts` re-exports from and what the conforming exemplar `tools/commands/page-type/hard-delete.ts` imports. The hazard the dispatch names — a hand-rolled error exiting 70 rather than 1 because `exitCodeForThrowable` classifies by class — is answered identically either way, both files raising the code repository's own classes.

Proved on the moved verbs: `ops spec check /nonexistent-path-xyz` exits 1, `ops spec check` with no argument exits 1, `ops package move --seq 19005 --from packages/shared/nonexistent-pkg --to packages/shared/other` exits 2, each byte-identical to the same invocation against the pre-move tree.
