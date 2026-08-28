---
id: 01a046c4-1975-7399-b832-f24a5f4683dd
slug: one-ground-two-caches-and-untracked-files-switch-off-one
page-type-slug: finding
title: "Two caches compute one ground over the same folders and an untracked file switches off only one"
domain-slug: domain/pages-system
---

# Claim

`page/shape/mark.ts` and `page/property/type-cache.ts` each define a `Ground {base, blobs}`, a `presentIn`, a `recordedAt`/`recordedFor`, a `blobsUnder`, a `WeakMap<FileTree, Ground | null>` and a sha256 key, over the same eight code folders. They differ in one line: `type-cache.ts:105` `matchesHead` adds `git ls-files --others --exclude-standard` to the `git diff-index --quiet` that `mark.ts:49` `matchesCommit` runs alone. An untracked file therefore disables one cache and not the other.

# Evidence

Measured 2026-08-27. `keyFor` returns null for every chain, while `shapeMarkOf` returns `dfe9889e…` and `typeMarkOf` returns `e79c6984…`. Replicating the predicates on the arguments the modules pass: `matchesCommit(root, CODE_DIRS)` is true; `matchesHead` is false — `diff-index --quiet` exits 0, and `ls-files --others --exclude-standard` reports 68 entries. With `keyFor` null, `keptAnswer` and `keepAnswer` (`type-cache.ts:184`, `:191`) are never reached with a key.

On disk: `.git/pages/resolved/page-type/` holds 2,905 files across 392 slug directories, newest mtime 11:50:25. `.git/pages-answers/` holds 8,700 and was written seconds before the reading. The page-type cache had been entirely off for eleven and a half hours; the answers cache was live.

The eight folders are byte-identical lists — `CODE_DIRS` (`mark.ts:10-19`) and `CODE_AT` (`type-cache.ts:24-33`): `cache`, `checks-system/refusal`, `during-call`, `exclusive`, `page`, `pages-system/page-type`, `repo`, `write-whole`. The sibling seed lists are not duplicates.

Two corrections to the shape as first put to me. `presentIn` is not duplicated: `mark.ts:38-40` takes globs and resolves them itself, `type-cache.ts:72-74` takes resolved folder names, so a caller cannot swap one for the other. And the untracked `.d.ts` artifacts are not what stopped the cache — their mtimes run 16:36 to 19:25, hours after the last cache write. The entry that fits is `pages/page-property-definition/page-type-named-for.page-property-definition.staged`, untracked at 11:50:34, nine seconds after it. The `.d.ts` files now break `matchesHead` independently, so clearing either alone would not revive the cache.
