---
id: c0a40885-cbcf-52da-be5f-934a16e2bef1
page-type-slug: finding
title: "A fix exits zero having never checked what it wrote"
domain-slug: domain/checks-system
---

# Claim

`check-no-void-return --fix` rewrites files, exits 0, and never typechecks what it wrote. Three files clean under TypeScript 5.9.3 at `--strict` were rewritten; it printed `fixed 3 file(s)` and exited 0, and two of the three then failed to compile. The finding that first recorded this carried a probe that cannot fire, so anyone reproducing from its text concludes the fault is gone.

# Evidence

Measured 2026-08-28 by a delegate of seat astra, in a scratch repo.

Three files, each compiling clean under the repo's TypeScript 5.9.3 at `--strict`. `check-no-void-return --fix --repo-root` printed `fixed 3 file(s)` and exited 0. Recompiled: case A still clean, cases B and C fail with TS2322.

Case B returns an ambient `declare function fv(): void`. Case C returns an interface method `emit(): void`. In both the callee is outside the walk's reach, so its `: void` stays while the caller is rewritten around it. Three exclusions put it there: `ts-void-declarations.ts:40` skips a declaration with no body, `:61` skips a function type node, and `ts-file-iteration.ts:17` excludes `.d.ts` files wholesale. Every `: void` in a declaration file is immovable while its callers move.

The gate resolves no position for its own output. `treeSha` is passed through and never used to check what was written.

**The prior finding's probe cannot fire.** `void-return-gate-ground-not-at-its-own-position` gave the reproducing case as `function fv(): void {}` beside `function before(): void { return fv() }`, and asserted it breaks when the second annotation becomes `: undefined`. It does not: the fix rewrites both in one pass and the file compiles clean afterwards. Reproducing from that text yields a pass, and the reader concludes the fault is fixed. Corrected at `9949c6d2aca3d4d39c379bdc3a2a551b8f97124d`.

This is not the HEAD-read-twice defect closed at `e0b74934`. That was a commit read twice while it moved. This is a gate that never checks its own output at all.
