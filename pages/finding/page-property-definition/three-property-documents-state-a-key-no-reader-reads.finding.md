---
page-type-slug: finding
title: "Three property documents state a key no reader reads"
domain-slug: page-type/page-property-definition
---

# Claim

`page-property-definition-derives` declares the key `derives` on `page-type/page-property-definition`, three property documents state it with real values, and no code anywhere reads it. A declaration with no consumer reads exactly like a live one to whoever is writing a page: the key is declared, its values are enumerated, a page states one, every gate passes, and nothing happens.

The three that state it are not incidental. Two are the pages system's own: `page-type-extends-slug` and `page-type-slug` each state `derives: from`, and `page-property-definition-defined-on-slug` states `derives: to`. So the staleness direction of the extends chain and of the defined-on relation is recorded on disk and read by nothing.

Of the 31 keys declared on `page-type/page-property-definition`, `derives` is the only one no `.ts` file quotes.

# Evidence

Measured 2026-08-28 at `21f6c2ffd` on `main`.

**The declaration.** `pages/page-property-definition/page-property-definition-derives.page-property-definition.md` states `key: derives`, `defined-on-slug: page-type/page-property-definition`, `type: select(slug)`, `values: none, from, to, both`, `default: none`. Its Definition reads "which end of this reference goes stale when the other changes."

**The three statements.** `git grep -n '^derives:' -- '*.page-property-definition.md'` returns exactly three:

- `pages/page-property-definition/page-property-definition-defined-on-slug.page-property-definition.md:8` — `derives: to`
- `pages/page-property-definition/page-type-extends-slug.page-property-definition.md:9` — `derives: from`
- `pages/page-property-definition/page-type-slug.page-property-definition.md:9` — `derives: from`

**No reader.** `git grep -l '"derives"' -- '*.ts'` returns zero files. Widening to the bare word, `git grep -n 'derives' -- '*.ts'` returns eight hits and every one is English prose inside a message string — `check-no-hardcoded-surface.ts:72`, `check-package-names.ts:53`, `codegen-type-identity-pairs.ts:17`, `popover-family-wrappers.ts:111`, two `repo-root.ts`, `editor-extension-single.ts:125`, `exercise/next-set.ts:40`. None is a frontmatter read.

**It is the only one.** Sweeping all 31 keys declared on `page-type/page-property-definition` — `append-only, attachment, back-from, backstop, blank, computed, default, defined-on-slug, derives, expression, from, function, key, max, may-be-gone, narrows-slug, normalized-by-slug, normalized-from, one-of, pattern, relation, required, rows, secret, slug-property, target, target-slug, type, uncommitted, unmatched-example, values` — and testing each for a quoting `.ts` file, `derives` is the single key with none. Two that look unread are not: `append-only` is read at `tools/page/page-rows-home.ts:20`, and `normalized-by-slug`, `normalized-from` and `unmatched-example` are read by `tools/lib/rules-engine-rule-set.ts`.

**Why the default makes it quieter rather than safer.** The declaration carries `default: none`, so even a reader that appeared would find a value for every property. The three explicit statements would then start meaning something, at whatever moment a consumer lands, without any of them being rewritten.

Filed as a new finding rather than a restoration. `pages/finding/pages-system/a-property-document-can-read-green-over-an-unread-key.finding.md` recorded this class in August with `max` as its standing instance; `max` is now read at `page/property/declarations.ts:143` and `page/property/record.ts:16`, so that finding's instance is dead and it is being taken away as wrong. This is the same observation with a live instance, which `pages/page-type/finding.page-type.md:24` says is filed fresh rather than the old one restored.

Not measured: whether `derives` was ever read, or whether it was written ahead of a consumer that has not landed. This repository's history opens at `a1d265eda` on 2026-08-25, so a reader deleted before that would leave no trace here.
