---
page-type-slug: finding
title: "Three property documents state a key no reader reads"
domain-slug: page-type/page-property-definition
---

# Claim

`page-property-definition-derives` declares the key `derives` on `page-type/page-property-definition`, three property documents state it with real values, and no code anywhere reads it. Of the 31 keys declared on that page type, `derives` is the only one no `.ts` file quotes.

# Evidence

Measured 2026-08-28 at `21f6c2ffd` on `main`.

**The declaration.** `pages/page-property-definition/page-property-definition-derives.page-property-definition.md` states `key: derives`, `defined-on-slug: page-type/page-property-definition`, `type: select(slug)`, `values: none, from, to, both`, `default: none`. Its Definition reads "which end of this reference goes stale when the other changes."

**The three statements.** `git grep -n '^derives:' -- '*.page-property-definition.md'` returns exactly three, all under `pages/page-property-definition/`:

- `page-property-definition-defined-on-slug.page-property-definition.md:8` — `derives: to`
- `page-type-extends-slug.page-property-definition.md:9` — `derives: from`
- `page-type-slug.page-property-definition.md:9` — `derives: from`

So the staleness direction of the extends chain and of the defined-on relation stands on disk, read by nothing.

**No reader.** `git grep -l '"derives"' -- '*.ts'` returns zero files. Widening to the bare word, `git grep -n 'derives' -- '*.ts'` returns eight hits, every one English prose inside a message string. None is a frontmatter read.

**It is the only one.** Sweeping all 31 keys declared on that page type and testing each for a quoting `.ts` file, `derives` is the single key with none. Two that look unread are not: `append-only` is read at `tools/page/page-rows-home.ts:20`, and `normalized-by-slug`, `normalized-from` and `unmatched-example` are read by `tools/lib/rules-engine-rule-set.ts`.

Filed fresh rather than restored: `a-property-document-can-read-green-over-an-unread-key` recorded this class with `max` as its instance; `max` is now read at `page/property/declarations.ts:143` and `page/property/record.ts:16`, and it was taken away on 2026-08-28.

Not measured: whether `derives` was ever read. This repository's history opens at `a1d265eda` on 2026-08-25, so a reader deleted before that would leave no trace.
