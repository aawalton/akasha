---
id: 01a046d1-9ec4-7cfc-be84-3db5ed1f6ce6
page-type-slug: finding
slug: the-page-type-cache-is-disabled-by-untracked-declaration-files
title: "The page type cache has been off all day, disabled by 68 untracked files, and no dist directory is among them"
domain-slug: domain/page-types-system
---

# Claim

`matchesHead` at `page/property/type-cache.ts:105-109` returns false when any untracked, non-ignored file stands under the paths the cache watches. 68 such files stand there now. The cache — `.git/pages/resolved/page-type/`, 2,905 files, 44 MB — has been unusable since 11:50 on 2026-08-27, and every process that resolves a page type has recomputed from scratch since. `dist` directories are not the cause: zero of the 68 sit under any `dist/`.

# Evidence

`matchesHead` runs `git diff-index --quiet HEAD -- <named>` and then `git ls-files --others --exclude-standard -- <named>`, and returns true only where the first exits 0 and the second prints nothing. So an untracked file nobody has told git to ignore disables the cache by standing there, whatever it contains.

`diff-index` is clean right now, checked. The cache is failing on the second clause alone.

The watched set is assembled at `type-cache.ts:125-133`: `CODE_AT` (`type-cache.ts:24-33` — `cache`, `checks-system/refusal`, `during-call`, `exclusive`, `page`, `pages-system/page-type`, `repo`, `write-whole`), plus the property folders, plus `.gitignore`, plus the page type folders.

The 68, counted with `git ls-files --others --exclude-standard` over exactly that set: 48 under `page/`, 10 under `repo/`, 6 under `cache/`, and one each under `write-whole/`, `exclusive/`, `checks-system/`, `pages/`. 67 are `.ts` — every one a `.d.ts` emitted in place — and one is `pages/page-property-definition/page-type-named-for.page-property-definition.staged`.

The `.staged` file turned the cache off: its mtime is 2026-08-27 11:50:34. The newest file in the cache was written at 11:50:25, nine seconds earlier. The cache has produced nothing since.

`grep -c 'dist/'` over the 68 returns 0. None of the watched paths is a `dist`, and the six large `dist` trees — `shared/status-bar-access` 3,297 files, `shared/pages-access` 287, `infra/scripts` 269, `alanwalton/personas-core` 54, `shared/recurrence` 9, `shared/design-tokens` 4 — sit under `shared/`, `infra/` and `alanwalton/`, which the cache does not watch.

Not established: the recomputation cost. An earlier reading in this session put it near 150 ms per process, not re-measured here; 2,905 cached answers are being recomputed.

Not established: why the in-place `.d.ts` files are emitted at all, or which build writes them.

The 68 are untracked, so they may be another seat's in-flight work.
