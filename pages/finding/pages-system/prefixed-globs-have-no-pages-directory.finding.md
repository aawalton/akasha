---
id: 67d711a8-fa05-4a15-95e1-1249c852401f
page-type-slug: finding
title: "Seat and subagent are the only prefixed globs, and neither has a pages directory"
slug: prefixed-globs-have-no-pages-directory
domain-slug: domain/pages-system
---

# Claim

`relPathFor` composes a write destination as `pages/<slug>/<name>.<slug>.md` whenever `suffixOf` recognises the page type's glob, and that prefix is written into the code rather than read from the glob. `suffixOf` recognises a glob only where it begins `**/`. So the two page types that state a prefixed glob fall to the other branch instead, and widening the pattern to recognise them — the obvious repair for the read-path disagreement `slug-derivations-disagree` names — would route every seat and subagent write into a directory that does not exist.

# Evidence

`shared/pages-access/src/file-name.ts:51` — `BY_NAME` is anchored `^\*\*\/`. `:53` — `suffixOf` answers null for anything it does not match. `:58` — `relPathFor`, whose suffix branch at `:61` returns `pages/${slug}/${name}.${slug}.md`.

Of 391 tracked `*.page-type.md` pages, exactly two state a glob that does not begin `**/`: `pages/page-type/seat.page-type.md` states `akasha:agent/seat/**/*.seat.md`, and `pages/page-type/subagent.page-type.md` states `akasha:agent/subagent/**/*.subagent.md`. Neither `pages/seat/` nor `pages/subagent/` exists.

Three consumers carry the `pages/<slug>` assumption, not two. `shared/pages-access/src/file-name.ts:61`; `page/page-types.ts:211` — `placeDirOf`, over `PAGES_ROOT = "pages"` at `:13`; and `page/page-types.ts:236` — `placeOf`, which manufactures `pages/<slug>/**/*.<slug>.md` rather than reading the `files:` the page type states. The third is `checks-system/check/page-holds-to-its-type/staged-tree.ts:69`, which takes `placeDirOf(slug)` as a directory prefix.

I did not run the write path, and I changed neither file.
