---
id: c9d8be77-c254-4eec-b32d-0b2ae8ef32e8
slug: the-kebab-rule-reaches-every-pointer-to-a-slug-and-no-stated-slug
page-type-slug: finding
title: "The kebab rule reaches every pointer to a slug and no stated slug"
domain-slug: page-type/page-property-definition
---

# Claim

Alan's kebab rule is enforced wherever a slug is pointed at and nowhere one is stated. `page/document/value.ts:6` refuses a non-kebab slug and is reached only for the types `slug` and `relation-slug`. `page-slug.page-property-definition.md:7` declares the `slug` key `text`, whose rule refuses only a non-string or an empty value, so a page may state any slug. Declaring it `slug` would refuse every new subagent page, where the fault is a deliberate mark.

# Evidence

Read and run 2026-08-28 at 444b407937.

`page/document/value.ts:6` is `const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/`. Two entries in `page/property/value.ts` reach it through `checkScalar`: `:164` for `slug`, and `:179` for `relation-slug` via `relationSlugRule` at `:155-161`. Both govern a value pointing at a page. `page/property/type-cache.ts:59` holds the same literal, sanitising a cache directory name and enforcing nothing here.

A stated slug goes through none of it. `pages/page-property-definition/page-slug.page-property-definition.md:7` states `type: text`, and the `text` rule at `page/property/value.ts:166-170` refuses a non-string and the empty string, nothing more. That is how `pages/spell/the-wandering-inn/剑圣-心火之刃.spell.md` stood: its slug was never judged. It was renamed to `jian-sheng-xin-huo-zhi-ren` at 4a9ba65e78, leaving no page slug holding a character outside `[a-z0-9-]`.

Changing `:7` to `type: slug` is the obvious fix and is blocked. It would refuse 5 story chapters whose slug ends in a hyphen, such as `0010-mark-of-the-fool-book-2-out-today-in-e-book-paperback-audio-`, and every subagent page, whose slug carries `--` because `agent/writer.ts:1` is `export const SUBAGENT_MARK = "--"`. The mark is deliberate, so this is no backlog to clear: the subagent count read 9, then 8, then 7 within one hour as agents came and went, and each new one would be refused. Alan's ruling and that mark collide, and nothing yet says which yields.

Measured over `^slug:` on page files, excluding `dirty/`: 0 uppercase, 0 leading hyphens, 0 characters outside `[a-z0-9-]`. Controls, same flags and globs with one name changed: `^title: .*[A-Z]` hit, and `apista-s-jetfire` hit both its page and its sidecar row.
