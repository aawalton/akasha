---
page-type-slug: finding
title: "The worktree half of the stand-down was never reverted"
domain-slug: domain/checks-system
---

# Claim

Nine checks bind a patch and one binds a worktree. Fourteen of the fifteen carry `check-on-worktree: false`, including every check believed restored after the repository merge.

The stand-down that set them was a temporary measure with a stated end. Its patch half has been reverted eight times by hand; its worktree half has never been reverted for anything.

# Evidence

Measured against `main` on 2026-08-28 across all fifteen `*.check.md` pages.

`ad5e04f09` (2026-08-26) set `check-on-patch: false` and `check-on-worktree: false` on thirteen checks at once. Before it those files carried neither key. Its message states the reason — the merge could not reach a passing tree one package at a time — and its own terms: "Nothing judges a write into akasha until this is reverted," and "This commit is the whole switch and reverting it is the whole restoration."

Of the thirteen, `import-reach` was later deleted, eight now bind a patch, and four do not: `links-resolve`, `page-holds-to-its-type`, `page-name-unique`, `read-what-is-required`. `import-resolves`, `require-import-extension` and `folder-matches-a-shape` were never in that commit; they were written later, already off.

The eight were restored by setting `check-on-patch: true` and leaving `check-on-worktree: false` standing.

`read-before-write` is the one check that binds a worktree, and it is the worked example of what a restoration looks like here: it carries **neither** key, because the lines the stand-down added were deleted rather than flipped. That is what restores the default.

So the explicit `false` on the other fourteen is not a leftover that resembles a decision. It stands beside proof in the same directory that someone knew the other way.

Not measured: what any check would report on a worktree, or what a worktree run costs. No worktree check has run since 2026-08-26, so there is no reading to compare against.
