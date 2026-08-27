---
id: 5be17be0-1c87-5d67-8100-4e5936caa83e
slug: proc-subset-checker-unwired
page-type-slug: finding
title: "Proc subset checker unwired"
domain-slug: domain/pages-system
---

# Claim

The TypeScript-subset checker for procedural source is wired into nothing. `findForbidden`, at `shared/proc-compiler/src/forbidden.ts:16`, rejects the constructs with no plpgsql lowering — `forEach` with a control-flow `return`, `replaceAll`, classes, untyped `any`, `Promise.all`, `await` on a non-context call — and is reachable from its own unit test and no other caller. It sits on no compile path and no CI path, so a forbidden construct in a real procedure file is caught by nothing. The `check-proc-subset` gate two documents name does not exist.

# Evidence

Read in `~/code` at 2026-08-07.

A walk of every `.ts` and `.tsx` in the repo, excluding `node_modules` and build output, finds exactly one importer of `@shared/proc-compiler/forbidden` outside the module's own files: `packages/shared/pages/proc-compiler/src/forbidden.unit.test.ts`. It feeds `findForbidden` hand-written string fixtures from `src/__fixtures__/forbidden.ts`. No procedure source file is passed through it anywhere.

`packages/shared/pages/proc-compiler/src/index.ts` is seven lines and exports only `compile`. Its comment: "`findForbidden`, `CompileOptions`, and `CompileResult` are wired but not re-exported here yet — no consumer outside this package's tests references them."

`compile.ts` (286 lines) names the module once, at line 15, in a comment about sharing a `ts.createSourceFile` shape. It does not call it.

`check-proc-subset` occurs exactly once in the whole code tree: `packages/shared/proc-compiler/src/forbidden.ts:7` — "Same module is imported by the CI gate (`check-proc-subset`) and by each per-domain compiler entry point, so compile-path and check-path agree by construction." Neither half holds: no check file, no registration, no entry point calling it.

The similarly named `check-forbidden-reachability` is unrelated — `packages/infra/checks/src/lib/forbidden-reachability.ts` decides findings over the directed package graph, not any AST.

A second document asserts the same absent gate: `packages/shared/pages/proc/CLAUDE.md`, now quarantined in the instructions repo at `dirty/code/packages-shared-pages-proc-claude.md`, line 75 — forbidden constructs "fail the `check-proc-subset` CI gate before they reach the compiler". That file is queued for removal, which is why this is recorded here.

The checker itself is complete and well tested; `forbidden.unit.test.ts` covers every rule. Nothing calls it on real input, so its green tests are what make the absence invisible.
