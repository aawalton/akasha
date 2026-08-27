---
id: f808cdfe-e149-5c91-9da9-9dcfba406fc6
page-type-slug: finding
title: "A package removal is reached by four caller classes and no instrument sees more than one of them"
domain-slug: domain/global
---

# Claim

A package removal is reached by four distinct classes of caller, and no single instrument sees more than one of them — so a survey that comes back clean is not evidence the removal is safe.

# Evidence

Measured over the removal of `packages/agents/oauth-proxy`, landed 2026-08-17 at `399e8491`. Each class is one an actual survey missed and something else later caught.

1. **Imports.** Found by a TypeScript import search and by a reach graph. The only class anyone looks for.

2. **Path strings in JSON and config.** `ast-unused.config.json`, `tmpfs-scratch.config.json`, `liveness-census.baseline.json` at seven lines, and `spawned-scripts.ts`, whose own test asserts every listed path exists on disk. No reach graph sees these. Two searches restricted to `--include=*.ts` returned two hits each and read as complete; `git grep -ln` over all tracked files returned twelve.

3. **TypeScript project references.** `packages/agents/cli/tsconfig.json:21` carried `{ "path": "../oauth-proxy" }`. No symbol search finds it and it breaks typecheck outright.

4. **Runtime `await import` of a template literal.** `tools/tests/proxy-seats-arm.ts:33` loaded the code-repo module through a path built on `codeRoot()`. Invisible to every static analysis, and it also inverted the removal order: the instructions-side reader had to go first, since the code file could neither survive its package's deletion nor be deleted while a live reader still loaded it. It surfaced only as a merge-queue cherry-pick conflict on the third deploy attempt.

Classes 2, 3 and 4 were each found by a person after an instrument reported clean. `Derived Reach` asks a check to derive its reach wherever a new member can arrive; a runtime path built from a function call is a member no derivation over the source can reach, so the gap is structural rather than a defect in any one check.
