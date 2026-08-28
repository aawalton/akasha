---
id: e1245444-1083-5bf4-a37c-652e601521e6
page-type-slug: finding
title: "Typecheck drops 620 files its own design line says it owns"
domain-slug: domain/checks-system
---

# Claim

`typecheck.check.md:23` declares that a file belongs to the nearest `tsconfig.json` above it, whether or not that file's paths name it. `program.ts:239` does the opposite: `rootsFor` keeps only the files its owner's `files` set names. 620 of the 10,379 tracked `.ts` files reach no program, and the check reports a pass. Nothing declares this, unlike the foreign-compiler skip at `program.ts:302`, which line 27 does declare.

# Evidence

Measured 2026-08-28 by importing `program.ts` and `checks-system/run/tree.ts` and driving `projectsIn`, `ownerOf`, `partition` and `rootsFor` over `onDisk` of this repository. The population is the 10,379 tracked `.ts` paths an audit roots at (`typecheck.check.code.attachment.ts:110`, `run/audit.ts:35`). Unseen: the 880 tracked `.tsx`, a subject on no run, and whatever git does not track.

Of the 10,379: 4,185 reach a program through their owner; 3,202 have no owner and are judged under `DEFAULT_OPTIONS` (`program.ts:26-36`); 2,372 sit in the 55 `tstl`-keyed projects skipped at `program.ts:302`; 620 have a non-foreign owner that does not name them. Counting the foreign owners too, 747 files are unnamed by their owner.

The drop is the `filter` at `program.ts:239`, not the empty return at 240: `claimed.length === 0` fires for no group on this tree. `lua-compiler/tsconfig.json` names none of the 132 files under `lua-compiler/tests/` while claiming `src/`, so the group is not empty and the tests are filtered out one by one. `shared/pages-core/tsconfig.json` drops 131 of 238. Rooted at those 131 under that project's own options, `tsc` reports 94 diagnostics, among them `shared/pages-core/src/null-ordering.unit.test.ts:16:45 TS2769`. The gate passes all 131.

`DEFAULT_OPTIONS` is checking under other options rather than none, and it does set `strict`. Against `tsconfig.base.json` it lacks `noUncheckedIndexedAccess`, `jsx`, `esModuleInterop`, `isolatedModules` and `resolveJsonModule`; 258 of 261 projects resolve `noUncheckedIndexedAccess` true. No `tsconfig.json` is tracked anywhere under `tools/`, and the root `tsconfig.json` ends `"files": []` so it owns nothing at `program.ts:137`. All 1,610 tracked `.ts` under `tools/lib` therefore fall to `DEFAULT_OPTIONS`, 99 of them the CI-generating `tools/lib/check-workflow/`. `tools/lib/eso-typings/generate.ts` is clean under `DEFAULT_OPTIONS` and reports TS2532 at 18:22 and 22:36 once `noUncheckedIndexedAccess` is added.
