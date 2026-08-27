---
id: 7f55938a-15e1-5129-a9a9-5a7ea76762d9
slug: biome-build-dir-exclusion-swallows-source
page-type-slug: finding
title: "Biome build dir exclusion swallows source"
domain-slug: domain/global
---

# Claim

Biome's `!**/build` exclusion, written to skip build OUTPUT, also excludes every hand-written source file that happens to sit in a directory named `build` — including the addon build scripts the deploy path runs.

# Evidence

Observed on 2026-08-10 against the tree at `/home/walton/worktrees/18484`.

`biome.json` `files.includes` takes `**/*.ts` and then subtracts a list of build-output directories: `!**/.next`, `!**/out`, `!**/build`, `!**/dist`, `!**/coverage`. The `!**/build` entry is a directory-name match, so it subtracts any directory called `build` wherever it sits, not only the gitignored output ones.

`git ls-files '*/build/*.ts'` returns 17 tracked files. Eight of them are `packages/temper/addons/scripts/build/`: `build-addon-bundle.ts`, `build-addon.ts`, `build-all-addons.ts`, `consolidation-migrations-data.ts`, `copy-metadata.ts`, `install-addon.ts`, `run-tstl.ts`, `typecheck-all-addons.ts`. These are hand-written source, committed, and on the deploy path — `build-addon.ts --build-only` is what the CI `addon-build` step and the deploy verb's build-only gate both spawn.

How it shows up at the two surfaces:

- Naming the file: `ops lint-verdict packages/temper/addons/scripts/build/build-addon-bundle.ts` exits 2 with `biome opened 0 files for target … — a verdict over an empty population is not a verdict`. It refuses rather than passing, which is the instrument behaving.
- Naming the directory above it: `ops lint-verdict packages/temper/addons/scripts` exits 0 with `VERDICT: PASS … 0 errors … 9 tracked lintable file(s) under packages/temper/addons/scripts were NOT opened (biome config / ignore exclusions) [over 7 of 16 files]`. The pass is real for the 7 it opened and the shortfall is stated beside it, so this surface does not hide the gap either.

What has no such surface is the repo-wide run: a `biome check` over the whole tree opens the files `includes` admits and reports on those, so these 17 have simply never been in a lint population and nothing about a green repo says so. Files edited here are formatted and checked by hand, against a house style enforced everywhere else.

Noticed while editing `build-addon-bundle.ts` for project #18383, where `ops lint-verdict` refused the file and the commit verb's biome pass had nothing to say about it.
