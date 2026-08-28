---
id: 5be17be0-1c87-5d67-8100-4e5936caa83e
slug: proc-subset-checker-unwired
page-type-slug: finding
title: "Proc subset checker unwired"
domain-slug: domain/pages-system
---

# Claim

The TypeScript-subset checker for procedural source, `findForbidden` at `shared/proc-compiler/src/forbidden.ts:16`, has no importer at all, sits on no compile path and no CI path, and the `check-proc-subset` gate two documents name does not exist.

# Evidence

Read in `~/code` at 2026-08-07.

`findForbidden` rejects the constructs with no plpgsql lowering — `forEach` with a control-flow `return`, `replaceAll`, classes, untyped `any`, `Promise.all`, `await` on a non-context call.

A walk of every `.ts` and `.tsx` in the repo, excluding `node_modules` and build output, once found exactly one importer of `@shared/proc-compiler/forbidden` — that module's own unit test, feeding `findForbidden` hand-written string fixtures. Re-measured, the count is now 0: `rg -l 'proc-compiler/forbidden'` excluding `dist` and `pages/` returns nothing at all. No procedure source file was ever passed through it.

`packages/shared/pages/proc-compiler/src/index.ts` is seven lines and exports only `compile`. Its comment: "`findForbidden`, `CompileOptions`, and `CompileResult` are wired but not re-exported here yet — no consumer outside this package's tests references them."

`compile.ts` (286 lines) names the module once, at line 15, in a comment about sharing a `ts.createSourceFile` shape. It does not call it.

`check-proc-subset` occurs exactly once in the whole code tree: `packages/shared/proc-compiler/src/forbidden.ts:7` — "Same module is imported by the CI gate (`check-proc-subset`) and by each per-domain compiler entry point, so compile-path and check-path agree by construction." Neither half holds: no check file, no registration, no entry point calling it.

The similarly named `check-forbidden-reachability` is unrelated — `packages/infra/checks/src/lib/forbidden-reachability.ts` decides findings over the directed package graph, not any AST.

A second document asserts the same absent gate: `packages/shared/pages/proc/CLAUDE.md`, now quarantined in the instructions repo at `dirty/code/packages-shared-pages-proc-claude.md`, line 75 — forbidden constructs "fail the `check-proc-subset` CI gate before they reach the compiler". That file is queued for removal.

`forbidden.unit.test.ts` covers every rule, and nothing calls it on real input.
