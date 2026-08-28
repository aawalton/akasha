---
id: 1c6890e8-e974-5e53-a08f-0aab827fd8f5
page-type-slug: finding
title: "Every ask of the index costs the whole index"
slug: every-ask-of-the-index-costs-the-whole-index
domain-slug: domain/pages-index
---

# Claim

`page/index/scan/scan.ts` matches every page in the index against every glob it is handed, so one ask costs the whole index however few paths it answers with. A reader asking about many page types asks many times. Measured on 2026-08-28, the status bar groups spent most of a 1.68s strip inside glob matching alone, over the same handful of distinct globs.

# Evidence

Read 2026-08-28 at `375daccb9e`.

The pathology is recorded in the code itself, at `page/index/scan/scan.ts:27-31`: every ask walks every page; the index holds every page in the repository and this matches each one against each glob, so one ask costs the whole index however few paths it answers with; a reader asking about many page types asks many times, and the readouts ask once per readout; measured on 2026-08-28, the status bar groups spent most of a 1.68s strip inside glob matching alone, over the same handful of distinct globs.

The file is 61 lines. `:10-14`, where this comment was previously cited, is now the `indexWouldAnswer` docblock.

The counterpart already built is `pages-system/store/files.ts`, where `pagesUnder` walks once and keys by kind, so a caller asking about many kinds pays one walk rather than one per glob.

Beside it in the same file, and part of why the walk cannot simply be dropped: `scannedFromIndex` refuses rather than falling back where a repository carries no mark, at `scan.ts:45-53` — `builtFrom()` is read and a missing mark throws, the message stating that an empty answer would read exactly like a repository with no page in it and every check over it would pass.

The consulting site is `scanIn` at `page/page-types.ts:102-132`, which tries the index first at `:107-108`, refuses an unnamed repository at `:109-117` and walks the disk at `:118-131`. `tools/lib/page-derive.ts:31` imports it and calls it at `:177`.

Not measured: the 22ms-through-the-index against 218ms-forcing-the-walk figure over 721 paths was taken 2026-08-27 and was not re-run.
