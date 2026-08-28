---
id: 21df1033-9ba1-56c4-961d-d74d54564681
slug: one-root-resolves-a-workspace-name
page-type-slug: finding
title: "A workspace name resolves within one root, so no package-at-a-time move between two repositories has an unbroken intermediate state"
domain-slug: domain/workspace-package
---

# Claim

Bun resolves a workspace name within one root, so a package cannot leave a repository that still resolves it. Moving a dependency first breaks the dependents left behind; moving a dependent first strands it naming a package still outside. A sweep in either direction leaves a broken intermediate state unless something bridges the two roots while the split lasts. Moving a whole repository's packages in one act has no intermediate state to break, at the cost of one refusal blocking everything.

# Evidence

Measured 2026-08 across the code, instructions and akasha repositories. 290 packages carry a name across the three.

Six packages moved one at a time ahead of the rest sit in exactly the state this predicts: they name packages still in `code`, and they come right only when the rest follow.

`ops package move --all` refuses a partial plan for the same reason, and refuses rightly. Handed the 118 packages that pass akasha's export check, it found `packages/temper/game/characters/character` reaching `../../../../shared/utils/narrow`, six of its siblings reaching the same place, and `capture/addon` reaching `packages/temper/addons` for the ESO typings and the base config. Those targets fail the export check and so would stay in `code`, and a path from akasha to a package still in `code` cannot be written. Naming their eventual place in the plan does not help: after the act they would still be in `code`, so the rewritten path would name a directory that does not exist yet.

This also settles that forks cannot be reconciled ahead of the move. Whichever copy lands in akasha becomes the one, and the reconciliation happens at the moment the second repository's copy arrives to find the place taken.

Not measured: whether a `link:` or path dependency pointing into the second root does in fact resolve under bun for the duration of a split. The whole-repository act was taken instead, so the bridge was never tried.
