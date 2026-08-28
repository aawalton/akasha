---
id: 5e248462-69c0-47e7-b394-17170d90b3d0
slug: gate-judgement-is-reached-by-nothing
page-type-slug: finding
title: "Gate judgement is reached by nothing"
domain-slug: domain/pages-system
---

# Claim

`tools/lib/gate-judgement.ts` exports `JUDGES`, `GATE_PAGE_GLOB`, the `Judged` type, `judgementByGate`, `judgesTheWriter` and `standsAsideFor`, and nothing outside the file names any of them. `standsAsideFor` is a one-line pass-through to `judgesTheWriter`, which suggests a caller it once had. `pages/repo/akasha-repo.repo.md:23` says this repository contains no unused code, so either the file goes or the reader that was to use it is missing — and which of those it is cannot be read off the file. Whoever settles it should also settle what reads a gate page's `judges:` now, because on this evidence nothing does.

# Evidence

Measured 2026-08-27 against akasha at `14ab92b7f`, by searching every `.ts` file in the repository outside `node_modules` and `dist` for each exported name. `judgementByGate`, `judgesTheWriter` and `standsAsideFor` appear only at their definitions in `tools/lib/gate-judgement.ts` and nowhere else.

The file was touched at `14ab92b7f` only to keep it compiling: `scanIn`'s repository argument became required, and its call at line 14 now names `akasha`. That call reads `pages/gate/**/*.md`, which carries no page-type suffix, so it never consults the index and the argument does not change its answer either way.
