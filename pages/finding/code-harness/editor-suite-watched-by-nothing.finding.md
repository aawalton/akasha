---
id: 00669854-eeb0-565b-be9f-60ac2625068a
page-type-slug: finding
title: "Editor suite watched by nothing"
domain-slug: domain/global
---

# Claim

The three editor checkouts hold a test suite that nothing watches. A change in `~/code` can break it, and nothing fires until somebody happens to commit in one particular checkout of the three.

# Evidence

Found by the seat on #19302 while repairing an assertion that had already been false across two deploys.

`~/code-editor` has a pre-commit hook that runs the extension tests, and it runs them only on a commit to that checkout. `~/code-editor-live` and `~/code-editor-staging` have no hook at all; commits made there ran nothing. There is no CI anywhere in that repository, its `test` script is an echo, and nothing under `~/code/packages/infra` reaches into it.

The suite imports from `@shared/status-bar-access` in `~/code`, so the dependency runs the wrong way for the watching that exists: the code that can break it is not the code whose commit checks it.

The case that surfaced this: `extensions/ops/src/features/status-bar/render.unit.test.ts` asserted `UPKEEP_TOOLTIP` equals `plants · activity · sleep · hygiene · capacity · safety`. Hygiene left that constant two deploys earlier. The assertion was false in all three checkouts and stayed that way until a seat working on something else went looking.

The same repository holds `extensions/ops/dist/extension.js`, a build-time snapshot of `~/code` that only a hand-run build refreshes. Twice in two days Alan's editor status bar drew from a stale one, the second time calling functions that had been dropped from the store.

CHECKED INDEPENDENTLY 2026-08-17, and every claim above holds. One thing to add: the coverage that exists is incidental rather than placed. `~/code-editor/.git/hooks/pre-commit` is a stock husky 0.13.4 hook, which runs `npm run -s precommit` — `build/hygiene.ts`, `build/opsExtensionTests.ts`, `build/terminalApiTests.ts` — and husky installs that hook wherever `npm install` was run. So the one checkout that checks anything is the one somebody happened to install in, not one chosen to be the gate, and no decision anywhere says which checkout is watched.
