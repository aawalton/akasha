---
id: 75d0ae4e-7bbf-5819-94fb-e8993e0738e4
page-type-slug: finding
title: "Cap crossed by two in budget additions"
domain-slug: domain/global
---

# Claim

The file-length budget an author can measure is `wc -l` on their own working tree; the budget the merge-queue pre-gate applies is the count on the merged result, which does not exist yet and depends on what lands before the deploy. Two additions each inside the headroom they could see sum past the cap, so the collision is first observable at the merge, after both authors are done.

# Evidence

Recorded 2026-08-07 while ingesting `dirty/skills/code-quality/findings.md`, which carried the observation from `project-16964` on 2026-07-29 under a `{"kind": "inference"}` basis. Re-derived here against live code rather than carried over.

THE TWO BUDGETS ARE DIFFERENT NUMBERS. `packages/infra/checks/src/lib/file-length-core.ts` is the shared predicate, and its header says the merge-queue coordinator's "post-build file-length pre-gate" calls it against a merged staging tree while the CLI walks the author's own file graph. `MARKDOWN_LINE_CAP` is 200 in `packages/agents/instruction-document/src/markdown-length.ts`; code files cap at 500 in `MAX_LINES_BY_EXT`.

THE EJECTION IS REAL AND WORDED FOR THE MERGED TREE. `pages/finding/code-gate/pregate-identity-breaks-on-its-own-subject.finding.md` quotes one: "file CLAUDE.md would exceed the 200-line cap (201 lines) when merged onto current main — split it". That finding is a different class — a change to the predicate itself — and it says so, so this one is filed beside it rather than folded in.

IT IS NOT AN ATTENTION FAILURE. The source's instance had one edit adding 56 lines against a 143-line base with 57 of headroom, and a second adding 22 from main, which the branch could not see at all. It also survives a correct rebase: a conflict resolved by hand measured 199 and a later commit in the same rebase replayed and added 12 more, so a mid-rebase measurement describes an intermediate tree rather than the one checked.

WHAT DID NOT SURVIVE THE RE-DERIVATION. The source's instance file `packages/alanwalton/projects/core/docs/project-move-guards.md` no longer exists, and its remedy-space paragraph rests on `docs-file-length.md` and `docs-length-sweep.md`, neither of which is tracked in the code repo any more. The claim above is the part that re-measured true.

NOT MEASURED. How often this fires, and whether the pre-gate could report the merged count to a branch before the deploy rather than at ejection.
