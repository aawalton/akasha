---
id: f83e0c8e-be05-5b52-ad0b-95c5c9c345b0
slug: void-return-gate-ground-not-at-its-own-position
page-type-slug: finding
title: "Void return gate ground not at its own position"
domain-slug: repo/akasha-repo
---

# Claim

`check-no-void-return --fix` writes its rewrites and exits 0 without typechecking what it produced, so a run that breaks a body reports success and hands the confirming to whoever ran it.

# Evidence

`infra/cluster-checks/src/checks/check-no-void-return.ts:110-116`: where `flags.fix` is set the scan applies `applyFixes`, `writeFileSync`s the result and returns `[]`, so a rewritten finding leaves no violation behind it. At `:120-124` the run prints `fixed N file(s); run typecheck to confirm.` and calls `process.exit(0)`. No typecheck happens. The exit is 0 whatever the rewrite did, and the printed line is the whole of the confirmation.

Measured 2026-08-28. Three files, each compiling clean under the repo's own TypeScript 5.9.3 at `--strict`, were put in a scratch repository and this check run over them with `--fix --repo-root`. It printed `fixed 3 file(s)` and exited 0. Two of the three then failed to compile, both with TS2322, "Type 'void' is not assignable to type 'undefined'":

    declare function fv(): void
    export function before(): undefined { return fv() }

    export interface Sink { emit(): void }
    export function before(s: Sink): undefined { return s.emit() }

In each the caller was rewritten and the callee was not. `applyFixes` rewrites only what `scanVoidDeclarations` emitted, and that walk skips a declaration with no body (`ts-void-declarations.ts:40`) and a function type node (`:61`). Declaration files are outside the walk altogether (`ts-file-iteration.ts:17`), so a `: void` in a `.d.ts` stays while its callers move.

Where the callee is inside the walk there is no break: `function fv(): void {}` beside `function before(): void { return fv() }` compiles clean after `--fix`, because both annotations move in the one pass. An earlier reading here named that shape as the break, having changed only the second annotation by hand; that is not what the fix does.

Not measured: `--fix` was not run over this repository, so how many files hold the breaking shape is unknown.
