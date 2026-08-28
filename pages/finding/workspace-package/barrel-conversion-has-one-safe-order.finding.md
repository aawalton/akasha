---
id: c40c9861-88c1-5d2e-9d78-60d9bd1232b2
slug: barrel-conversion-has-one-safe-order
page-type-slug: finding
title: "Converting a package from a barrel to subpath exports is three acts, and only one order of them leaves no broken tree"
domain-slug: domain/workspace-package
---

# Claim

Add `"./*": "./src/*.ts"` alongside `"."`, which is purely additive and leaves both spellings resolving; then rewrite the importers; then delete the barrel and the `"."` entry together. Rewriting importers first lands a tree where the new specifiers cannot resolve, because the `exports` entries that would satisfy them arrive in the next commit. Adding the subpath exports and removing `"."` at once is not the additive act and breaks every importer not yet rewritten.

# Evidence

Observed 2026-08 converting `code` and `instructions` packages ahead of the akasha move.

`652764f6` rewrote `instructions/.../ops/provenance.ts` to `@infra/git-porcelain/parse-status` while that package still exported only `"."`. The window is a few seconds wide and it took `ops` down for every seat: `ops read` and `ops write` both failed, so no seat could read or land anything. Athena was running in the window and caught it.

Two faults compounded it. The batch script did not check the exit code of `ops write` or `ops rm`, so once `ops` was down it went on recording success while every manifest amendment and barrel removal silently failed — the log is worthless for the packages after the break, and the only trustworthy record is the tree. And the rewriter can emit a subpath relative to the package root where the `exports` pattern wants it relative to `src/`: `@shared/cli/src/ops/provenance` resolves to `./src/src/ops/provenance.ts` and fails. It bites only a package whose modules sit nested below `src/`, which is why `git-porcelain`'s flat `parse-status.ts` came out right, and tree-wide it happened exactly once.

The conversion itself is mechanical rather than a rewrite. `@alanwalton/awen-core` forwarded 403 names over 38 modules through 37 `export * from` lines; reading the barrel transitively gives each name its declaring module, and where one import statement drew names from several modules it becomes several statements. Thirty-two files were rewritten, the `exports` map became `{"./*": "./src/*.ts"}`, and `src/index.ts` went. All 47 surviving specifiers naming that package resolve to a real module, checked against the tree rather than assumed.
