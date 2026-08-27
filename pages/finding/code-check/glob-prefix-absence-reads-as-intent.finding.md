---
id: 9eeb20b9-438e-5740-a08f-9201c35dc045
page-type-slug: finding
title: "Glob prefix absence reads as intent"
domain-slug: domain/global
---

# Claim

`expandGlobEntry` in `packages/shared/workspace-paths` silently skips a glob whose prefix directory is absent, and its docblock calls that intended — so a workspace pattern naming a directory nobody has created yet contributes no packages and reports nothing.

# Evidence

Found while tree #18484's children were tracing what their checks actually enumerate, and held on the tree document as a manager's obligation until now; moved here because a finding is read by the next sweep where a tree note dies with the tree.

Three of the root manifest's `workspaces` entries are globs. The resolver walks each prefix directory and returns nothing when the directory is absent, which the docblock states as deliberate rather than as a gap. That is defensible for a glob whose tree has genuinely been removed, and it is the wrong answer for one whose tree has not been created yet or has been moved — the two cases are indistinguishable at the call site, and the second reports a smaller workspace than the manifest declares with no diagnostic.

What makes it the initiative's rather than one package's: several standing checks derive their population by walking the workspace, so a package set silently short by one glob is a population line that names a count nobody can falsify. This is the same shape as `code-check/derivation-stops-one-level-short` — the derived level is sound and the hand-written level above it carries no bound of its own — with the twist that here the silence is documented as intent.

Not verified against a planted absent prefix. The reading is from the source and its docblock, so what a run actually does with a missing prefix is still to be confirmed.
