---
id: bcf5bb42-f15d-5894-b64c-39013f07a5a5
page-type-slug: finding
title: "Two write paths make an uncommitted file without a page, and no sweep takes one away"
domain-slug: domain/page-storage-uncommitted
---

# Claim

`pages/domain/page-storage-uncommitted.domain.md:33` — "An uncommitted file goes when its page goes" — stands under `# Intent`, so it does not hold yet. Nothing holds it for the code-editor page types, and two write paths make the state it forbids.

`patchState` at `tools/lib/page-write.ts:136-147` takes a page type and a name, asks `whereFor` where that page would stand, makes the directory, writes the uncommitted file there, and answers with the address. It never writes a page and never asks whether one is there. `whereFor` does not refuse a name nothing stands under — `tools/lib/page-write-where.ts:91` composes a path for a page that does not exist — so a `patchState` naming no page leaves an uncommitted file alone in a folder and reports that it worked.

`writePage` at `tools/lib/page-write.ts:105` and `patchPage` at `:132` each run `patchUncommitted` after `landOne`, outside any test of what `landOne` did. `landOne` turns a refused landing into `commitError` rather than throwing, and both functions hand that error back beside a `Written`. So a write whose page was refused still writes the page's uncommitted file.

Nothing reaps the result. `services/sweep-seat-pages.ts:75-94` holds `orphanSidecarPages`, which reads the seats directory, takes every name ending in the uncommitted suffix, and reaps those whose `.md` is absent. `services/sweep-editor-pages.ts` has no counterpart: it reaches pages only through `namesOf` at `:91`, `:101` and `:105`, which enumerates pages, so an uncommitted file whose page is absent is not a thing it can see.

An uncommitted file is gitignored — `.gitignore:1` is `*.uncommitted.yaml` — so no gate, no commit and no link check reaches one either. Between them, nothing in the repository can report this state.

# Evidence

Measured 2026-08-28 by seat astra, on `main`.

`tools/lib/page-write.ts:136-147` read whole. The body is `whereFor`, `mkdirSync(dirname(at.path), { recursive: true })`, `patchUncommitted(at.path, { ...values })`, `return at`. There is no `landOne` and no page compose in it.

`tools/lib/page-write.ts:105` and `:132` each read `if (Object.keys(split.uncommitted).length > 0) patchUncommitted(at.path, split.uncommitted)`, and the line after each returns `{ ...at, commitError: took.commitError }`. The `patchUncommitted` call is not inside a test of `took`.

`services/sweep-seat-pages.ts:75-94` reads `readdirSync(dir)`, skips names not ending `UNCOMMITTED_SUFFIX`, builds the `.md` path beside each, `if (existsSync(pagePath)) continue`, and collects the rest. Searching `services/sweep-editor-pages.ts` for `uncommitted` returns nothing.

Not measured: whether `patchState` is reached today with a name no page stands under. The editor's observation store is its caller, and it names a window it is observing, so the case needs a window whose page was removed between the observation and the write.

Not measured: whether the other page types with uncommitted properties are swept by anything. Only the seat sweep and the editor sweep were read.

The one recorded instance of this state has been taken away. Eleven uncommitted files stood in akasha with no page beside them — one window's subtree, `457299-17999629`, its group and nine tabs, holding tab labels, an active flag, and one window's feature-activation record stamped `observed-at: 2026-08-26T23:05:18.443Z`. They were not made by either path above: `git log --all` over `pages/code-editor-*/457299*` is empty, so those pages never stood in akasha, and the files came across during the 2026-08-27 10:18 migration that moved these page types out of `memory`, carried by hand because gitignored files cannot travel through git. 516 uncommitted files stood before; 505 stand now, and every one of them stands beside its page.
