---
id: 96fd619b-bf4a-51f7-a6c1-397fa9763072
page-type-slug: finding
title: "Ast unused population drops tsconfigless workspaces"
domain-slug: domain/global
---

# Claim

A workspace holding TypeScript but no `tsconfig.json` leaves `check-ast-unused`'s population before it is enumerated, so it can be neither counted nor named as a shortfall, and the coverage sibling calls it out of scope on that same test.

# Evidence

`readWorkspacesFromPackageJson` drops a workspace at `if (!existsSync(tsconfigPath)) continue` before the list it returns becomes the population's member set, so the filter sits upstream of the denominator rather than inside `examine`. The population's own `corpus.because` states that discovery throws on a missing or unparseable manifest "rather than returning a short list", which is true of the manifest and not of this filter.

Read on worktree 18484 at `ee707e9680`: `check-ast-unused` prints `[over 386 of 386 workspaces]` where `listWorkspaceDirs` returns 389, and `check-ast-unused-coverage` prints 389 accounted for as 186 analysed, 3 out of scope, 200 pending curation. The three are `packages/stories/engine`, `packages/infra/lib` and `packages/books/all-about-alan`, and `git ls-files` shows none of them tracking a `.ts` or `.tsx` file — so nothing is hidden today and the gap is latent rather than live.

Both instruments test the same thing, absence of a `tsconfig.json`, so neither can report the other's blind spot: a workspace that gained a `.ts` file without gaining a `tsconfig.json` would read as out of scope in the coverage check and be absent from the population line, with no reading anywhere saying it went unanalysed.
