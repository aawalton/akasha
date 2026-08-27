---
id: 8d42c828-00a3-5569-bd21-d8cd03e82c27
page-type-slug: finding
title: "Dom guard frame too narrow"
domain-slug: domain/global
---

# Claim

The component-test DOM guard fires only where the cwd is the repo root, but the condition it exists to catch is any cwd with no `bunfig.toml` — so a run from a subdirectory of a correctly configured package gets neither the happy-dom preload nor the guard, and all three surfaces describing the guard name the trigger as "the repo root".

# Evidence

Measured 2026-08-07 at `~/code` HEAD `ecf5f9518f76` on main, Bun 1.3.14.

All three surfaces frame the trigger as the repo root. Root `bunfig.toml:1-4` — "a `*.component.test.*` run from the repo ROOT". `packages/shared/utils/test/src/component-dom-guard.ts:3-5` — "the signature of running `bun test <path>` from the repo root". `packages/shared/utils/test/src/setup/component-dom-guard.ts:1-3` — "Root-invocation guard".

Each also states the fact that makes the frame too narrow: Bun reads `bunfig.toml` from the cwd only. The root guard loads for exactly one cwd, so any other cwd without a `bunfig.toml` gets neither the package preload nor the guard.

REPRODUCED BY INVOCATION, in a correctly configured package. `packages/alanwalton/web/bunfig.toml` exists and carries the happy-dom preload; its component tests sit a level down at `app/components/`. Run from that subdirectory, `bun test mini-player-bar.component.test.tsx` exits 1 with a bare `ReferenceError: document is not defined` from `@testing-library/react/dist/pure.js:256` — the error the guard exists to replace, with the guard not loaded to replace it.

RELATION TO `pages/finding/tests/dom-guard-misdirects-nested-root.finding.md`, read before filing. That covers the remedy TEXT misdirecting under a nested build-root marker, where `cd <package-dir>` lands in the failing directory. This is the general rule underneath it and a second class: here the package is a proper workspace with a working preload, and the failure comes from the cwd being one level deeper. I add the frame claim — the sources say "root" where the rule is "no bunfig.toml in cwd" — which that finding does not make.

WHAT I DID NOT MEASURE. Whether anything elsewhere sends a reader to a subdirectory to run tests, so I cannot say how often this is hit. I ran one component test in one package, not the population.
