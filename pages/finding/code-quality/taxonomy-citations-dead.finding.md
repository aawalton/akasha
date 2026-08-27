---
id: 2d0bfc6b-f926-58d9-8452-9e83c255e57e
slug: taxonomy-citations-dead
page-type-slug: finding
title: "Taxonomy citations dead"
domain-slug: domain/code-quality
---

# Claim

The functional-type checks instruct their own future authors through comments citing a document that was deliberately not promoted. Sixteen sites across twelve files in `@infra/checks` cite `Functional Type`; its source sits in `dirty/maybe-keep/`, and the reading against it dropped the taxonomy as duplicating what the checks refuse. One comment tells a future author to sync the discriminator chain with a `§ Taxonomy` section that does not exist, so the ten values have predicates and no stated meanings.

# Evidence

Read in the worktree `/var/home/walton/worktrees/18146` at commit `ebb4c23225`, and in `~/instructions`.

`grep -rn "Functional Type" --include=*.ts packages/infra/checks/src/` returns 16 matches across 12 files, among them `lib/functional-type.ts`, `lib/functional-type-rules.ts`, `lib/layer-monotonicity.ts`, `checks/check-layer-monotonicity.ts` and `checks/check-tsconfig.ts`.

The instruction is in the `DISCRIMINATOR_CHAIN` docblock of `lib/functional-type-discriminators.ts`: "When adding a new discriminator, place it at the position matching its specificity tier. The numeric rows in Functional Type § Taxonomy mirror this order exactly — keep both ends in sync." `lib/layer-monotonicity.ts` twice cites `docs/layer-monotonicity.md`; the code repo has no root `docs/`.

The absence was checked, not assumed. Over the code repo, `find . -iname "*functional-type*" -name "*.md"` and `find . -name "layer-monotonicity.md"` return nothing outside `node_modules`. Over `~/instructions`, `grep -rli "functional.type" domains/` returns only `domains/lists/unresolved-checks.md`, where `check-functional-type` and `check-layer-monotonicity` stand as unreviewed members. `dirty/maybe-keep/knowledge/functional-type.md` (9 lines) and `functional-type-composed.md` (11 lines) exist; the composed reading promotes one rule, Derived Over Declared, onto `domains/instrument.md` and states that nothing else of the source's subject survives.

Not measured. I ran neither check and built nothing — three developer seats were committing to that branch, so I confined myself to reads. I did not search the memory repo or the retired domains for an earlier promoted form, so I cannot say whether these citations went stale or were written against a document already set aside. I read the surrounding prose closely at two of the twelve files only, so I cannot say whether any citation besides the discriminator one carries an instruction rather than a pointer.
