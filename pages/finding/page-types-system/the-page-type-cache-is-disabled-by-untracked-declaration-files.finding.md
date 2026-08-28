---
id: 01a046d1-9ec4-7cfc-be84-3db5ed1f6ce6
page-type-slug: finding
slug: the-page-type-cache-is-disabled-by-untracked-declaration-files
title: "The page type cache has been off all day, disabled by 68 untracked files, and no dist directory is among them"
domain-slug: domain/page-types-system
---

# Claim

`matchesHead` at `page/property/type-cache.ts:105-109` returns false when any untracked, non-ignored file stands under the paths the cache watches. 68 such files stand there now. The cache — `.git/pages/resolved/page-type/`, 2,905 files, 44 MB — has been unusable since 11:50 on 2026-08-27, and every process that resolves a page type has recomputed from scratch since.

`dist` directories are not the cause and are exonerated. Zero of the 68 sit under any `dist/`. An earlier theory blamed the 134 `dist` directories in the repository; it is wrong, and acting on it would have sent someone at 134 directories that have nothing to do with this.

# Evidence

The whole mechanism is two lines:

    function matchesHead(root: string, named: readonly string[]): boolean {
      if (gitCapped(root, ["diff-index", "--quiet", "HEAD", "--", ...named]).code !== 0) return false
      const loose = gitCapped(root, ["ls-files", "--others", "--exclude-standard", "--", ...named])
      return loose.code === 0 && loose.stdout === ""
    }

`ls-files --others --exclude-standard` lists untracked files that are not ignored. The function requires that list to be empty. So an untracked file that nobody has told git to ignore disables the cache by standing there, whatever it contains.

`diff-index` is clean right now, checked. The cache is failing on the second clause alone.

The watched set is assembled at `type-cache.ts:125-133`: `CODE_AT` (`type-cache.ts:24-33` — `cache`, `checks-system/refusal`, `during-call`, `exclusive`, `page`, `pages-system/page-type`, `repo`, `write-whole`), plus the property folders, plus `.gitignore`, plus the page type folders.

The 68, counted with `git ls-files --others --exclude-standard` over exactly that set: 48 under `page/`, 10 under `repo/`, 6 under `cache/`, and one each under `write-whole/`, `exclusive/`, `checks-system/`, `pages/`. By extension, 67 are `.ts` — every one of them a `.d.ts` emitted in place — and one is `pages/page-property-definition/page-type-named-for.page-property-definition.staged`.

The `.staged` file is the one that turned the cache off. Its mtime is 2026-08-27 11:50:34. The newest file in the cache was written at 11:50:25 — nine seconds earlier. The cache has produced nothing since.

The `dist` theory is refuted by direct count: `grep -c 'dist/'` over the 68 offenders returns 0. `dist` directories cannot be the cause because none of the watched paths is a `dist`, and the six `dist` trees with the surprising shape — `shared/status-bar-access` at 3,297 files, `shared/pages-access` at 287, `infra/scripts` at 269, `alanwalton/personas-core` at 54, `shared/recurrence` at 9, `shared/design-tokens` at 4 — sit under `shared/`, `infra/` and `alanwalton/`, which the cache does not watch.

One correction to a related claim: `agent/commit-author.d.ts`, which is untracked and is exactly the same kind of in-place declaration file, is **not** among the 68 and does not disable the cache. `agent/` is not in `CODE_AT`. Repository-wide there are 24,774 untracked `.d.ts` files; only 67 of them fall under a watched path. Seeing one in `git status` is therefore not evidence that it costs anything, and the class is far larger than the part that matters.

Not established: the exact recomputation cost. An earlier reading in this session put it near 150 ms per process; that figure has not been re-measured here and should be taken as one reading rather than a settled number. The direction is not in doubt — 2,905 cached answers are being recomputed — but the per-process cost is not pinned.

Not established: why the in-place `.d.ts` files are emitted at all, or which build writes them. They are untracked and not ignored, which is the combination that bites; ignoring them, emitting them elsewhere, or not emitting them are three different fixes with different owners.

**The 68 must not be deleted.** They are untracked, which means they may be another seat's in-flight work, and this repository has roughly forty agents in it. Removing them would restore a 44 MB cache and cost whatever unfinished work they represent. Naming them is the useful act; sweeping them is not mine to do.
