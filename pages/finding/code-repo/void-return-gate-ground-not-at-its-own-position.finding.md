---
id: f83e0c8e-be05-5b52-ad0b-95c5c9c345b0
page-type-slug: finding
title: "Void return gate ground not at its own position"
domain-slug: repo/akasha-repo
---

# Claim

`check-no-void-return --fix` writes its rewrites and exits 0 without typechecking what it produced, so a run that breaks a body reports success and hands the confirming to whoever ran it.

# Evidence

`infra/cluster-checks/src/checks/check-no-void-return.ts:110`-`:116`: where `flags.fix` is set the scan applies `applyFixes` to the source, `writeFileSync`s the result and returns `[]`, so a rewritten finding leaves no violation behind it.

`:120`-`:125`, once the walk is done:

    process.stdout.write(
      `${PREFIX} fixed ${filesFixed.toLocaleString()} file(s); run typecheck to confirm.\n`
    )
    process.exit(0)

No typecheck is performed. The exit is 0 whatever the rewrite did, and the printed line is the whole of the confirmation.

The rewrite can turn a compiling file into a failing one. Measured with the repo's own TypeScript 5.9.3 at `--strict`, on a probe composed outside the repo: `function fv(): void {}` beside `function before(): void { return fv() }` compiles clean; changing that second annotation to `: undefined`, which is exactly what this fix does, gives TS2322, "Type 'void' is not assignable to type 'undefined'." A function declaration annotated `: void` is in the scanner's reach — `infra/cluster-checks/src/lib/ts-void-declarations.unit.test.ts:22`-`:25` pins that it is flagged.

So the one shape the fix can break fails only at a later typecheck the fix run does not perform, and the run that broke it exited 0.

Unmeasured. `--fix` was not run over the tree, so how many files it would rewrite, and whether any of them holds the breaking shape, is not measured here. The probe was compiled standalone rather than under the repo's own tsconfig.
