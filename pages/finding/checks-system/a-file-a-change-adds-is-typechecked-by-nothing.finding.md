---
id: 5217cf4d-8aab-51de-b529-811d43948c22
page-type-slug: finding
title: "A file a change adds is typechecked by nothing"
slug: a-file-a-change-adds-is-typechecked-by-nothing
domain-slug: domain/checks-system
---

# Claim

Every file a change adds reaches no program, so it lands without a typecheck and reads exactly like one that passed. `typecheck.check.md:37` states that no other route typechecks this repository, so nothing behind it catches what this misses. A second, independent half: every program is built with `composite: false`, so `TS6307` and `TS6059` cannot be raised by this check at all, and a cross-project import lands green even in a file the check does own.

# Evidence

Measured 2026-08-28 at `30bba46fad` through `ops write --dry-run` and `ops edit --dry-run` against `pages-system`. The pair differs in one thing: whether the file already exists.

`pages-system/link/link.ts`, added, holding `const broken: number = "not a number"`:

    gate: 11 akasha check(s) over 1 changed file(s), none refused

The same line added to the existing `pages-system/name/name.ts`:

    typecheck: pages-system/name/name.ts — line 32: TS2322: Type
    'string' is not assignable to type 'number'. nothing was written

`projectsIn` at `program.ts:119-124` spreads `ts.sys` and overrides only `readFile` and `fileExists` against the tree, so `:130` expands each config's `include` against real disk and `:141` takes `files` from that. An added file is on no disk, so no project names it, however plainly its glob would: `pages-system/tsconfig.json` includes `**/*.ts`.

`rootsFor` at `:239` keeps only changed paths its owner names. Adding files alone empties `claimed`, `:240` returns no roots and `:250` builds no program. Adding one file beside existing ones under one project drops it at `:239` while its neighbours are judged.

`typecheck-drops-620-files-its-own-design-line-says-it-owns` measures `:239` over files on disk and records `:240` as firing "for no group on this tree". It fires for a change that only adds files.

The second half, in a file this check owns: `:253` passes `composite: false`, and `TS6307` is raised only for a composite project. Adding `import { proseOnly } from "../../page/markdown/markdown.ts"` to the existing `pages-system/name/name.ts` passed all 11 checks; `pages-system/tsconfig.json` is `composite: true`, `tsc --noEmit -p` over it is clean at exit 0, and a scratch project with those settings answers `TS6307` for that import.

Not measured: whether any error stands behind files added so far, or whether `.tsx` behaves alike.
