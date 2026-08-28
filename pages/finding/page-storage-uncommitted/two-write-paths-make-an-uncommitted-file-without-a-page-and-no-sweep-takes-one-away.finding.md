---
page-type-slug: finding
title: "Two write paths make an uncommitted file without a page, and no sweep takes one away"
domain-slug: domain/page-storage-uncommitted
---

# Claim

`pages/domain/page-storage-uncommitted.domain.md:33` — "An uncommitted file goes when its page goes" — stands under Intent, so it is not true.

Two write paths make the state it forbids. `patchState` at `tools/lib/page-write.ts:136-147` writes an uncommitted file without writing or finding a page. `writePage` at `:105` and `patchPage` at `:132` write one after `landOne` has turned a refused landing into a `commitError`.

Nothing reaps the result, and the file is gitignored, so no gate sees one.

# Evidence

Measured 2026-08-28 by seat astra, on `main`.

`tools/lib/page-write.ts:136-147` read whole. Its whole body is `whereFor`, `mkdirSync(dirname(at.path), { recursive: true })`, `patchUncommitted(at.path, { ...values })`, `return at` — no `landOne`, no page compose. `whereFor` does not refuse a name nothing stands under: `tools/lib/page-write-where.ts:91` composes a path for a page that does not exist. So a `patchState` naming no page leaves an uncommitted file alone in a folder it just made, and reports that it worked.

`tools/lib/page-write.ts:105` and `:132` each read `if (Object.keys(split.uncommitted).length > 0) patchUncommitted(at.path, split.uncommitted)`, and the line after each returns `{ ...at, commitError: took.commitError }`. Neither call sits inside a test of what `landOne` did.

`services/sweep-seat-pages.ts:75-94` holds `orphanSidecarPages`: it reads the seats directory, takes each name ending in the uncommitted suffix, and keeps those whose `.md` fails `existsSync`. `services/sweep-editor-pages.ts` has no counterpart — searching it for `uncommitted` returns nothing — and reaches pages only through `namesOf` at `:91`, `:101` and `:105`. `.gitignore:1` is `*.uncommitted.yaml`.

The one recorded instance is gone. Eleven uncommitted files stood with no page beside them — window `457299-17999629`, its group and nine tabs, holding tab labels, an active flag, and a feature record stamped `observed-at: 2026-08-26T23:05:18.443Z`. Neither path above made them: `git log --all` over `pages/code-editor-*/457299*` is empty, so those pages never stood in akasha, and the files came across in the 2026-08-27 10:18 migration of these page types out of `memory`, carried by hand because a gitignored file cannot travel through git. 516 stood before; 505 stand now, each beside its page.

Not measured: whether `patchState` is reached today with a name no page stands under, and whether anything sweeps the other page types that carry uncommitted properties.
