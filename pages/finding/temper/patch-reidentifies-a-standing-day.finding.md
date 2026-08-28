---
id: f594bbb4-7fac-5413-9c9b-ba37774cd7ed
slug: patch-reidentifies-a-standing-day
page-type-slug: finding
title: "A patch carrying a minted id re-identifies the day that already stands"
domain-slug: domain/temper
---

# Claim

A net-worth reading is a row of the UTC day it was taken on, so the day's own page has to stand before the row can. `landNetWorth` gives an id only to a day that is not there yet, and that guard is load-bearing rather than tidy: `id` is not settled elsewhere on a file write, so a patch carrying a freshly minted one replaces the id of a day already standing. The comment recording this was deleted to unblock the code-comment gate, so the fact is filed here.

# Evidence

Run on 2026-08-20 against `daily-tracking`, on a fixture at the impossible date `2999-01-01` since removed. Nothing was written against Alan's real days.

`writePage` landed the day stating `id: A`, and `askComposed` read A back. `patchPage` on the same name carrying a different id returned `ok: true` and left the file stating `id: B`, which `askComposed` then read back as B. The path and the name never changed. The claim holds as written, and on every file-backed type rather than on net-worth days alone.

`landNetWorth` in `packages/temper/scripts/src/watcher/import-inventory.ts` asks `askPage(temper-net-worth-day, day)` and then patches, giving an id only where the answer is absent:

```
{ ...(standing.ok ? {} : { id: Bun.randomUUIDv7() }), title: day, slug: day, date: day }
```

The reading is written separately with `patchRow(temper-net-worth-snapshot, day, values)`, so the snapshot is a row held on the day's page rather than a page of its own. That is why the day must stand first.

What makes the guard load-bearing is in `packages/shared/pages/access/src/file-write.ts`. `SETTLED_ELSEWHERE` holds exactly `pageTypeSlug`, `pageTypeId` and `userId`; `id` is not among them, so `fileValuesOf` kebabizes it and passes it into the values written into frontmatter. `patchFilePages` resolves the page by its name and writes those values, so an id in the set overwrites the `id:` the file already states.

Nothing refuses it and nothing reports it. The page keeps its path and its name, so a reader addressing it by name sees no change; only a join on the uuid breaks, and it breaks silently.

The general shape is worth more than this one case: any unattended writer that mints an id unconditionally and patches a page by name re-identifies that page on every run. `landNetWorth` is correct today because it asks first. A writer copied from it without the `standing.ok` test would not be.

The comment stating this stood at line 33 of `import-inventory.ts` and was deleted in commit `22271173f0`, the code-comment gate refusing prose outside the parsed forms.
