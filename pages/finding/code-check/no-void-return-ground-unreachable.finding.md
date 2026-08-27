---
id: 72e52389-de05-56ec-9db6-7072fec509d8
slug: no-void-return-ground-unreachable
page-type-slug: finding
title: "No void return ground unreachable"
domain-slug: domain/global
---

# Claim

`check-no-void-return` is justified, on every surface that states a reason, by `: void` widening a function's return so the body may return any value and have it silently discarded. Measured with the repo's own compiler, an explicit `: void` on a definition admits no such thing. The widening lives only at assignment to a `void`-returning function type, which this gate does not read. What the migration it forces changes at a definition makes the code stricter, and is the one case `--fix` breaks.

# Evidence

The stated ground is in the check's own header, `packages/infra/checks/src/checks/check-no-void-return.ts:4–8`: "`: undefined` is the sound replacement". Its per-finding message is "`<kind>` returns `: void` — migrate to `: undefined`".

Measured with the repository's own TypeScript 5.9.3 (`node_modules/.bin/tsc --noEmit --strict`), each probe a standalone file:

With `declare function n(): number` — `function f(): void { return n() }` is TS2322, "Type 'number' is not assignable to type 'void'". So is `async function f(): Promise<void> { return n() }`. An explicit `: void` on a definition does not admit a returned value.

The widening is at the callback slot. `const d: () => void = () => n()` is clean; `const e: () => undefined = () => n()` is TS2322. That arrow carries no return annotation, so `scanVoidDeclarations` never reports it either way — the gate does not read the position where the unsoundness lives.

One difference at a definition is real, and it runs the other way. With `declare function fv(): void` — `function a(): void { return fv() }` is clean, and `function b(): undefined { return fv() }` is TS2322, "Type 'void' is not assignable to type 'undefined'". So `: undefined` is stricter than `: void` at exactly one point: returning a `void`-typed expression.

That is also the one body `--fix` can break. `applyFixes` replaces the `void` keyword's byte range with `undefined` and reads nothing of the body, and the fix path returns no findings and calls `process.exit(0)` at `check-no-void-return.ts:159`, before the reporter. So a `--fix` run over a tree of findings exits 0, prints a fixed-file count, and surfaces this case only as a later typecheck failure. The docblock's instruction to run typecheck afterwards is what stands in for a check; nothing runs it.

`check-no-void-return` is not a member of `domains/lists/unresolved-checks.md`, whose Definition makes absence mean the audit settled it.
