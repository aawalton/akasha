---
id: 3914b3d6-7d96-5db2-94e0-be0c5857e75c
slug: component-guard-reds-a-green-package
page-type-slug: finding
title: "Component guard reds a green package"
domain-slug: domain/global
---

# Claim

`ops tests run packages/infra/checks` from the repo root reports FAIL over three tests that do not exist, on a package CI runs green. The root `bunfig.toml` preloads a guard refusing any argv entry containing `.component.test.`, and three inert fixtures carry that suffix while holding no test and touching no DOM. CI escapes it by running from the package directory, so the red is reachable only by a seat checking its own work — and the text it throws names a cause that is not the one.

# Evidence

Measured 2026-08-10 at `af8994642a`, tree clean before and after, `origin/main` the same SHA.

`ops tests run packages/infra/checks` from `/home/walton/code` returns `VERDICT: FAIL — 3 failing test(s)`: component 0 pass / 3 fail, beside cli 126, property 29 and unit 3507 all passing. The three are the only `*.component.test.*` files in the package, all under `__fixtures__/mock-module-leak/pkg-fetchseam/src`. Bun reports each as `# Unhandled error between tests`, a module-load throw counted once per file, so they carry no test names because they hold no tests. They exist to be parsed by `check-mock-module-leak`, which names them as string literals at `check-mock-module-leak.unit.test.ts:259-291`.

The thrown text says the files require a package-local happy-dom preload. That is a hand-written string rather than a diagnosis: the predicate at `packages/shared/utils/test/src/component-dom-guard.ts:7-10` returns true when no `document` exists and any argv entry contains `.component.test.`, testing a filename substring and never whether the file wants a DOM. Its shim is preloaded by the root `bunfig.toml:5-6`, root-cwd-only by its own comment, and `packages/infra/checks` has no `bunfig.toml`, so the preload the message directs a reader to does not exist here.

`cd packages/infra/checks && ops tests run __fixtures__/mock-module-leak/pkg-fetchseam` gives PASS over 0 tests across 3 files — passing because the guard never loads, not because a DOM appeared. CI takes that route too: `packages/infra/tests/run-workspace-tests.sh:149` enters the package before `bun test`. The guard landed `e5b997afef` on 2026-07-04, the fixtures `0df22078f2` on 2026-07-18.

NOT MEASURED: whether an explicit happy-dom preload silences it; no other package was tested for the same collision; and why the seat that met this red ran from the repo root is not recoverable from the tree.
