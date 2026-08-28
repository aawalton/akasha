---
id: 67d711a8-fa05-4a15-95e1-1249c852401f
page-type-slug: finding
title: "Seat and subagent are the only prefixed globs, and neither has a pages directory"
slug: prefixed-globs-have-no-pages-directory
domain-slug: domain/pages-system
---

# Claim

`relPathFor` composes `pages/<slug>/<name>.<slug>.md` whenever `suffixOf` recognises a glob, and that prefix is written into the code rather than read from the glob. `suffixOf` recognises a glob only where it begins `**/`, so the two page types stating a prefixed glob take the other branch, which composes `agent/seat/<name>.md` — a name carrying no page type, and so not a page at all. The branch they take now is already wrong, not only the widened one.

# Evidence

`shared/pages-access/src/file-name.ts:51` — `BY_NAME` is anchored `^\*\*\/`. `:53` — `suffixOf` answers null for anything it does not match. `:58` — `relPathFor`, whose suffix branch at `:61` returns `pages/${slug}/${name}.${slug}.md`.

Of 391 tracked `*.page-type.md` pages, exactly two state a glob that does not begin `**/`: `pages/page-type/seat.page-type.md` states `akasha:agent/seat/**/*.seat.md`, and `pages/page-type/subagent.page-type.md` states `akasha:agent/subagent/**/*.subagent.md`. Neither `pages/seat/` nor `pages/subagent/` exists.

Three consumers carry the `pages/<slug>` assumption, not two. `shared/pages-access/src/file-name.ts:61`; `page/page-types.ts:211` — `placeDirOf`, over `PAGES_ROOT = "pages"` at `:13`; and `page/page-types.ts:236` — `placeOf`, which manufactures `pages/<slug>/**/*.<slug>.md` rather than reading the `files:` the page type states. The third is `checks-system/check/page-holds-to-its-type/staged-tree.ts:69`, which takes `placeDirOf(slug)` as a directory prefix.

I did not run the write path, and I changed neither file.

Re-measured 2026-08-28 by astra. `relPathFor` composes no write destination today: nothing outside its own file and its tests imports it, and it is reached only from `nameFromAt` at `:83`. Parsing all 391 tracked page types with `filedIn` rather than grepping `^files:`, which misses a list-valued one, gives 326 stated globs and 65 stating `files: none`, and exactly the two named here do not begin `**/`. What is live is the read-back, and `nameFromAt` is imported by `file-write.ts:149` and `file-page-name.ts:153,174`: it answers `abby.seat` for `agent/seat/abby.seat.md`, leaving the page type glued to the name. `placeOf`'s `pages/<slug>` fallback is reached for none of the 391. Not repaired here: `file-name.ts` is mid-ablation onto `page/name/naming/naming.ts` at `febfe291e`.
