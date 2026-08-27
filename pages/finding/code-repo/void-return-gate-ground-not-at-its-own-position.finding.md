---
id: f83e0c8e-be05-5b52-ad0b-95c5c9c345b0
page-type-slug: finding
title: "Void return gate ground not at its own position"
domain-slug: repo/code-repo
---

# Claim

`check-no-void-return.ts` calls `: undefined` "the sound replacement" for `: void`. At the position the gate acts on — an explicit return annotation on a definition — `: void` already admits no returned value, so there is no unsoundness there to replace. The widening the ground describes belongs to the function-type position, which this same rule preserves by design.

# Evidence

`packages/infra/checks/src/checks/check-no-void-return.ts:4`-`8`, read against `~/code` at `383bf60d35`: "Enforced CI gate — fails on any TypeScript function definition whose explicit return type annotation is `: void`. `: undefined` is the sound replacement."

Measured with the repo's own TypeScript 5.9.3 at `--strict`, on a probe composed outside the repo:

- `function a(): void { return n() }` with `n(): number` — TS2322, "Type 'number' is not assignable to type 'void'".
- `async function b(): Promise<void> { return n() }` — TS2322.
- `const c: () => void = () => n()` — clean.
- `const d: () => undefined = () => n()` — TS2322.
- `function e(): undefined { return fv() }` with `fv(): void` — TS2322, "Type 'void' is not assignable to type 'undefined'".
- `function f(): void { return fv() }` — clean.

At a definition `: void` is already tight: the first two lines are the widening the ground asserts, and the compiler refuses them. The widening is real at the third line, assignment to a `void`-returning function *type* — the callback slot this rule preserves by design, where the arrow carries no annotation the scanner could read. The gate cannot reach the position its ground is about.

What the migration does buy at a definition is the fifth line: `: undefined` refuses a returned `void`-typed expression where `: void` accepts it. That is a uniform call-site type rather than a soundness repair, and the stated ground never names it.

The remedy is built on the ground. `--fix` rewrites every flagged span and exits 0 unconditionally (line 155 rewrites, line 159 exits), so the one body it can break is exactly the case the ground would have to be about, and it breaks as a later typecheck failure that the fix run does not perform.

Three surfaces that restated this ground are gone from the code repo, and the docblock's own "Authoritative principle" and "Catalogue row" pointers resolve to nothing.

Found ingesting `dirty/questions/code-repo-check-stated-grounds.md`.
