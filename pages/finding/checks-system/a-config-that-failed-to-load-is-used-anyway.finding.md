---
page-type-slug: finding
title: "A config that failed to load is used anyway"
domain-slug: domain/checks-system
---

# Claim

`alanwalton/web/app-capacitor/tsconfig.json` extends a file that does not exist. TypeScript reports the failure; the check never asks. `projectsIn` reads the parse result's file list and options and never looks at its errors, so a config that failed to load is used as though it had loaded, with whatever options survived.

The project's files are then judged under a settings set nobody wrote, and the output is indistinguishable from a project judged under the settings it declares.

# Evidence

Measured against `main` on 2026-08-28, every leg verified from this seat rather than taken from a report.

THE CONFIG. `alanwalton/web/app-capacitor/tsconfig.json:2` states `"extends": "../../tsconfig.base.json"`. From `alanwalton/web/app-capacitor/` that resolves to `alanwalton/tsconfig.base.json`, and `ls` says no such file. The base every other project extends is at the repository root, two levels further up.

TYPESCRIPT DOES REPORT IT. `bunx tsc -p alanwalton/web/app-capacitor/tsconfig.json --noEmit`:

    error TS5083: Cannot read file '/var/home/walton/repos/akasha/alanwalton/tsconfig.base.json'.

It is not a silent failure in the compiler. It is a silent failure in the caller.

WHERE IT IS DROPPED. `checks-system/check/typecheck/program.ts:137-142`:

    if (parsed.fileNames.length === 0) continue
    ...
      files: new Set(parsed.fileNames.map((one) => resolve(one))),
      options: parsed.options,

`parsed.errors` is never read, here or anywhere in the file. A config that failed to parse still yields a non-empty `fileNames` and a usable `options`, so it passes the only test applied and becomes a project like any other. The degraded options are then the yardstick for every file it owns.

WHAT THE DEGRADATION IS. With the base unread the project loses `strict`, `noUncheckedIndexedAccess` and `moduleResolution: bundler` among the rest. The `moduleResolution` loss is visible in the same `tsc` run as three `TS2307`s whose text says the types exist and could not be resolved "under your current `moduleResolution` setting" — errors caused by the missing base rather than by the code.

SCOPE. 8 tracked `.ts`/`.tsx` files sit under this project. A sweep of all 274 tracked `tsconfig*.json` for a relative `extends` naming a path that is not on disk returns exactly one: this one. So the instance is small and the mechanism is not — nothing would have reported the second.

WHY THIS IS ITS OWN MECHANISM. It is not a project skipped as foreign, which at least declines to answer. It is not a file a project excludes. This project is compiled, reports diagnostics, and contributes a verdict — the verdict is simply taken under settings that exist because a file was missing. Of the ways found tonight for a green line to mean less than it says, this is the only one where the instrument silently substitutes a different standard and still speaks with the same voice.

NOT MEASURED. What the 8 files report once the `extends` is corrected, and whether any other config extends a path that exists but is itself broken further up the chain.
