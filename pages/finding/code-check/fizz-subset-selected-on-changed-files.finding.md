---
id: 3a0d8ad1-22ff-533c-a3d1-31900af4d120
page-type-slug: finding
title: "Fizz subset selected on changed files"
domain-slug: domain/global
---

# Claim

`check-fizz-subset` is a whole-tree scanner selected on the changed-file set, the shape `alwaysRun` exists to prevent. Its population is every `packages/**/spec/*.fizz` in the tree, but its dispatch closure walks outward from five seed packages, and the two packages holding nine of its paired specs consume those seeds rather than being consumed. It sets neither `alwaysRun` nor a seed reaching either, where 14 other checks set the flag. Drift in those nine lands green and reds a later unrelated commit.

# Evidence

Measured at `origin/main` `383bf60d35`, 2026-08-07, by an archivist seat emptying `dirty/questions/code-repo-check-computed-populations.md`, whose entry on this cut.

`alwaysRun` on `CheckConfigCommon`, `check-configs-types.ts:115`, is documented for exactly this: "Set this ONLY on a whole-repo scanner whose result is keyed by the tree SHA rather than by the changed-file set." Its comment says why selection on that set is unsound: the closure gate "can narrow it out of the branch's final (green-recorded) pipeline, and the branch goes green — then staging's cumulative `main..tip` diff always includes the file and the check reds at merge-queue (green-branch → staging-ejection, project #14695)". It calls force-keeping p90-neutral here.

`check-fizz-subset` is one. `discoverFizzSpecPairs` shells `git ls-files -- packages/**/spec/*.fizz`, returning 73 paths across seven roots today; two are check fixtures, leaving 71 real specs in six packages, 50 paired with a `src/pure/<name>.spec.ts` the gate recompiles and diffs.

Its dispatch is far narrower and sets no flag. `check-configs-spec.ts:79-87` gives `watchNodes` as the three CI worker packages, `@shared/fizz-compiler`, `@temper/game-items-rules-core` and its own two implementation files. `transitiveWorkspaceDeps` walks each seed's `dependencies` + `devDependencies` outward. `@alanwalton/projects-cli` (8 paired specs) depends on three of those seeds and `@agents/oauth-proxy` (1) on none, so consuming them puts neither package's paths in the resolved set. Those are also the two roots `SPEC_DIRS` omits, at `check-spec-bundle.ts:58-63`, so a commit touching only one of the nine dispatches neither spec gate.

The flag is in live use: 14 checks across seven `check-configs-*.ts` files set `alwaysRun: true`.

The coverage half — that the nine are model-checked by nothing — was filed separately and has since been decided into a project. This is the dispatch half.

Not judged: whether the repair is the flag, a seed per consuming package, or a narrower stated population.
