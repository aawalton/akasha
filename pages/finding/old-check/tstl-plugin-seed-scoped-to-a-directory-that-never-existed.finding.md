---
id: 788fc497-3d39-53eb-939d-fc39c71bfc09
slug: tstl-plugin-seed-scoped-to-a-directory-that-never-existed
page-type-slug: finding
title: "The tstl plugin check scopes a seed to a directory that never existed"
domain-slug: domain/old-check
---

# Claim

`cluster-check` `tstl-plugin-emit-fresh` scopes one of its two dispatch populations to `packages/temper/shared/build-deploy/tstl/src/plugins`, and that path holds no tracked file and never has. The population expands to nothing. The plugin sources the check actually reads stand at `packages/temper/addons/plugins`, a different tree, so the seed has never selected the check on a change to the thing it guards.

# Evidence

`pages/cluster-check/cluster-check-tstl-plugin-emit-fresh.md` declares two `dispatch-node-types`: a bare `js-file`, and `{ kind: ts-file, under: packages/temper/shared/build-deploy/tstl/src/plugins }`.

Found on 2026-08-24 by `dispatch-seeds-resolve` at code commit `f28fded`: "`ts-file` is a node type a producer registers and no node of it stands at or under `packages/temper/shared/build-deploy/tstl/src/plugins`, so this population expands to nothing — declared by 1: cluster-check `tstl-plugin-emit-fresh`." That check has since been removed on Alan's ruling; its finding is why this is written down.

Checked separately: the directory is absent from the working tree, and in `~/repos/code` both `git ls-files 'packages/temper/shared/build-deploy/tstl/src/plugins*'` and `git log -- packages/temper/shared/build-deploy/tstl/src/plugins` return nothing.

The plugins the check guards are `packages/temper/addons/plugins/tstl-no-multi-store.{ts,js}` and `tstl-no-truthy-numbers.{ts,js}`. `packages/infra/checks/src/checks/check-tstl-plugin-emit-fresh.ts` finds them by reading workspace configuration at run time rather than from the declared path, which is why the check has always worked while its seed has not.

The step is not left seedless: the bare `js-file` population resolves, and the same run reported "0 step(s) dispatching for no change at all".

Not verified: whether editing a plugin's `.ts` source alone, with its `.js` emit untouched, still selects this check through the `js-file` population. That turns on whether the graph carries an edge from an emit to its source, which was not measured, and it is the drift the check exists to catch.

Worth deciding: whether the scope is repointed at `packages/temper/addons/plugins` or dropped in favour of whatever already selects the check.
