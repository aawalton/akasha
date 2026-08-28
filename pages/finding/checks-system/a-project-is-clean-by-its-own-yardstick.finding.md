---
page-type-slug: finding
title: "A project is clean by its own yardstick"
domain-slug: domain/checks-system
---

# Claim

A project is judged by its own `tsconfig.json`, so a green typecheck says a tree is clean by whatever standard that tree chose. The output cannot say which standard that was.

Three of 265 configs do not extend the shared base. `editor-extension` is one, and under the settings the rest of the tree is held to it reports 151 errors while the audit reports none.

# Evidence

Measured against `main` on 2026-08-28, and verified from the configs rather than inferred.

`editor-extension/tsconfig.json` states no `extends`. It sets `strict: true`, then turns off `exactOptionalPropertyTypes`, `useUnknownInCatchVariables`, `noUnusedLocals` and `noUnusedParameters`, and never states `noUncheckedIndexedAccess`. Held to the base every other project extends, it reports 151 errors, 97 of them under `status-bar/`.

The other two without `extends` are `lua-compiler/lualib/tsconfig.json` and the root solution config, which claims no files and therefore owns none.

The audit is not failing to reach these files. Reach runs off `git ls-files` narrowed to `.ts`, with `ownerOf` at `checks-system/check/typecheck/program.ts:149` assigning each file to the nearest `tsconfig.json` above it; a project claiming zero files is skipped, and one carrying a key outside `TSC_KEYS` is skipped as foreign. The root `references` list decides nothing about it.

Reach was proved by positive control rather than argument: all 108 tracked `.ts` files under `editor-extension` enter the subject set, are owned by that config, root into a real program, and report zero. A deliberate `TS2322` was then appended to `extension.ts` in memory only, through the changed map with nothing written to disk, and the check reported it. The check is live, not asleep.

So "reached and clean" is exact and "clean by the standard the rest of the tree is held to" is false, and one green line means both.

This is the mechanism that survives repairing the other two. `rootsFor` returning `[]` drops files a project excludes; the root `references` list drops whole trees from `tsc -b`; and after both are fixed a project can still be clean by a yardstick nobody chose.

Found twice the same night from opposite ends — `pages-system` compiling without `noUncheckedIndexedAccess`, and `editor-extension` — by two seats, neither looking for the other's.

Not measured: what the other two configs report under the base, or what repairing any of the three would cost.
