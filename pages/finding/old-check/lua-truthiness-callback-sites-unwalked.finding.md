---
id: 5919eee1-150d-5e88-9113-e77482d820b1
slug: lua-truthiness-callback-sites-unwalked
page-type-slug: finding
title: "Lua truthiness callback sites unwalked"
domain-slug: domain/old-check
---

# Claim

The Lua-truthiness guard lost its call-expression sites when it moved to the transpile. `tstl-no-truthy-numbers` is now the only enforcer of the number and string arm, and its `visitNode` walks `if`, `while`, `do`, `for` and ternary conditions and nothing else. Over a `number[]`, `arr.filter((x) => x)` reaches no arm of the walk. The scanner deleted in the same commit did carry `.filter`, `.find`, `.every` and `.some` callback arms, so the criterion was carried over and the site enumeration was not.

# Evidence

Read at `383bf60d35c15cd5d10cd07f39ac33ffb38e2bfa`.

Commit `9272fcba82`, "17763: the Lua truthiness guard moves to the transpile, and its repo-wide twin goes", deleted `packages/infra/checks/src/lib/ts-strict-boolean-expressions.ts` and its check on a measured cost argument. Only `packages/infra/checks/dist/` still holds the names, and `dist/` is gitignored at `.gitignore:3`.

The commit says the plugin's criterion is the deleted check's `branchTriggers` "carried over intact, so the trap is caught where it can occur". The criterion did carry: `packages/temper/addons/plugins/tstl-no-truthy-numbers.ts:64` flags non-literal `number`, non-literal `string` and `LuaMultiReturn`, where before it flagged the brand alone.

The sites did not. `visitNode` in that file dispatches on `ts.isIfStatement`, `ts.isWhileStatement`, `ts.isDoStatement`, `ts.isForStatement` with a condition, and `ts.isConditionalExpression`. No call-expression arm appears anywhere in the walk, so no array-callback position is a condition to it in any spelling — neither `arr.filter((x) => x)`, nor `arr.filter((x) => { return x })`, nor `arr.filter(function (x) { return x })`, nor `arr.filter(Boolean)`.

The deleted scanner reached them. `git show 9272fcba82^:packages/infra/checks/src/lib/ts-strict-boolean-expressions.ts` documents "`.filter`/`.find`/`.every`/`.some` arrow-expression-body callback" among its sites and carries `filter-callback`, `find-callback`, `every-callback` and `some-callback` as finding kinds.

This is the boundary where the miscompile happens: `0` and `""` are truthy in Lua, so an element a predicate meant to drop is kept. The commit gives up pure-TS truthiness deliberately, calling it a readability trap rather than an inversion. It says nothing about giving up the callback position inside an addon compile.

Found ingesting `dirty/questions/code-repo-check-unreached-positions.md`, whose entry recorded a narrower version of this against the now-deleted scanner.
