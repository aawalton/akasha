---
id: 4766a433-4e79-513d-98d8-f2ad52dae4ca
page-type-slug: finding
title: "Surface tokens header false"
domain-slug: domain/global
---

# Claim

`packages/infra/checks/src/lib/jsx-surface-tokens.ts` opens by describing a rule that reads surface literals "on JSX elements" from "the already-extracted token strings from `jsx-class-tokens.ts`". Neither still holds: `check-no-hardcoded-surface` reads every static string in every module a component can reach, and `jsx-class-tokens.ts` no longer feeds this predicate at all.

# Evidence

Both sentences were true until project #18550. Before its commit `2565d08f50`, `check-no-hardcoded-surface.ts` imported `extractJsxClassUsages` from `../lib/jsx-class-tokens` and applied `isHardcodedSurfaceLiteral` to the tokens it returned, exactly as the header says. That project replaced the path with `lib/surface-literal-sites.ts`, which walks the file's own string literals and template chunks.

A grep for `isHardcodedSurfaceLiteral` across `packages/` returns one production caller, `lib/surface-literal-sites.ts:94`, plus the unit test and two docblock mentions. `jsx-class-tokens.ts` is not among them.

The header also lists, under "Two structural exceptions slip through (intentionally)", the `!` important-marker prefix — whose own bullet then ends "Flagged", which is what the code does. That contradiction predates #18550: the file's last commit is `347cc28962` from the `@infra/checks` consolidation.

The check's own docblock in `checks/check-no-hardcoded-surface.ts` was rewritten by #18550 and is accurate; it points a reader here for the variant-prefix exemption, so this is the header a reader arrives at second.
