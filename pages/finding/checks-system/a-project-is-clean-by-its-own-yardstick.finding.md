---
page-type-slug: finding
title: "A project is clean by its own yardstick"
domain-slug: domain/checks-system
---

# Claim

A project is judged by its own `tsconfig.json`, so a green typecheck says a tree is clean by whatever standard that tree chose. The output cannot say which standard that was.

Three of 265 configs do not extend the shared base. `editor-extension` is one, and under the settings the rest of the tree is held to it reports 101 errors while the audit reports none.

# Evidence

Measured against `main` on 2026-08-28, and verified from the configs rather than inferred.

`editor-extension/tsconfig.json` states no `extends`. It sets `strict: true`, then turns off `exactOptionalPropertyTypes`, `useUnknownInCatchVariables`, `noUnusedLocals` and `noUnusedParameters`, and never states `noUncheckedIndexedAccess`. Held to the base every other project extends, it reports **101** errors.

**THE 151 FIRST FILED HERE WAS WRONG AND IS CORRECTED.** It was taken by switching all five of the flags this config moves. Three of those five — `exactOptionalPropertyTypes`, `noUnusedLocals`, `noUnusedParameters` — are **not in `tsconfig.base.json`**, so switching them measured this project against a standard nothing in this repository has adopted. Per-flag, on tsc 5.9.3:

    noUncheckedIndexedAccess      101   in the base
    useUnknownInCatchVariables      0   in the base, via strict
    exactOptionalPropertyTypes     16   NOT in the base
    noUnusedLocals                 12   NOT in the base
    noUnusedParameters              3   NOT in the base
    all five                      132 raw / 130 distinct

The whole gap against the adopted base is `noUncheckedIndexedAccess`, and it is 101. Repo-wide the three unadopted flags account for a further 2,009 distinct faults over 1,277 files, so any figure quoting them overstates by that much. The 151 was passed to Alan before this was measured and has been withdrawn to him.

The other two without `extends` are `lua-compiler/lualib/tsconfig.json` and the root solution config, which claims no files and therefore owns none.

The audit is not failing to reach these files. Reach runs off `git ls-files` narrowed to `.ts`, with `ownerOf` at `checks-system/check/typecheck/program.ts:149` assigning each file to the nearest `tsconfig.json` above it; a project claiming zero files is skipped, and one carrying a key outside `TSC_KEYS` is skipped as foreign. The root `references` list decides nothing about it.

Reach was proved by positive control rather than argument: all 108 tracked `.ts` files under `editor-extension` enter the subject set, are owned by that config, root into a real program, and report zero. A deliberate `TS2322` was then appended to `extension.ts` in memory only, through the changed map with nothing written to disk, and the check reported it. The check is live, not asleep.

So "reached and clean" is exact and "clean by the standard the rest of the tree is held to" is false, and one green line means both.

This is the mechanism that survives repairing the other two. `rootsFor` returning `[]` drops files a project excludes; the root `references` list drops whole trees from `tsc -b`; and after both are fixed a project can still be clean by a yardstick nobody chose.

Found twice the same night from opposite ends — `pages-system` compiling without `noUncheckedIndexedAccess`, and `editor-extension` — by two seats, neither looking for the other's.

# What the whole gap is worth

Now measured, over one identical list of 11,247 tracked `.ts`/`.tsx`, partitioned by owning project, with only the checking flags moving:

    each project's own options      601 distinct faults over 260 files
    the base flag set               815 distinct faults over 304 files
    gap                             214 distinct, a factor of 1.36

**Not 16×.** The 2,774-vs-173 ratio quoted earlier in the night confounds three axes and is withdrawn: 79.5% of the 2,774 sit in files the audit never opens, the two instruments run different compiler versions (7.0.2 against 5.9.3, worth 26× on one bounded slice), and compiling all 18,015 files as one flat program turns a project that is green under both compilers into 1,049 errors. The honest repo-wide figure is 601 → 815.

Attribution of the 214 is narrow, and one line of it was not expected:

     99  editor-extension
     69  files with NO owning project, under DEFAULT_OPTIONS at program.ts:26-36
     41  lua-compiler/lualib
      5  alanwalton/web/app-capacitor
      0  any project that extends the base

Zero leakage into extending projects is a clean confirmation of the model. But the second line is the check's **own fallback**: `DEFAULT_OPTIONS` omits `noUncheckedIndexedAccess` and governs 3,199 files — a larger population than all three lax projects together. The instrument holds more files to a lax yardstick than any config in the repository does.

Not measured: what repairing any of the three would cost.
