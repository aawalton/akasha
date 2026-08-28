---
id: 0a1c47a0-ab49-56e5-8fad-2f27082267b3
page-type-slug: finding
title: "A tracked declaration file the build rewrites switches off both page caches"
domain-slug: domain/pages-system
---

# Claim

`during-call/during-call.d.ts` is tracked and a build overwrites it in place. While it stands
rewritten, `git diff-index --quiet HEAD` fails over the folders both page caches ground on, so
`matchesHead` at `page/property/type-cache.ts:105` and `matchesCommit` at `page/shape/mark.ts:49`
both return false, and `keyFor` and `shapeMarkOf` are both null. The untracked-file narrowing at
`dc403c91` does not reach this: that file is tracked, and it fails the other clause.

# Evidence

Measured 2026-08-28, 03:03 to 03:20. At 03:03 the file stood clean and `diff-index` exited 0 over
the fourteen paths `matchesHead` receives. At 03:07:30 its mtime moved and `git diff` showed fifteen
lines added — doc comments copied from `during-call/during-call.ts`, its own source. Since then
`diff-index` exits 1, over those fourteen and over the eight of `CODE_DIRS` alone.

`shapeMarkOf` returned null at 03:09. A reading on 2026-08-27, taken while the file stood clean, had
it at `dfe9889e…`. `during-call` sits in both `CODE_AT` (`type-cache.ts:24-33`) and `CODE_DIRS`
(`mark.ts:10-19`), which are byte-identical. `ownCodeParts` calls `matchesCommit` at `mark.ts:85`
and returns null on failure; `groundOverCommit` at `:96` and `groundSpanning` at `:125` refuse on it.

`.git/pages/resolved/page-type` holds 2,905 entries, newest write 2026-08-27 11:50:25, unmoved
across the whole measurement and across 162 commits that touched a watched folder.

The file is emitted output, not source: its body is `export declare` lines. It is the only tracked
`.d.ts` under the eight code folders. 69 more stand untracked under those same folders, and that
count was 67 seven minutes earlier, so the emitter is running now.

Thirteen `shared/*` and `infra/*` projects carry `"composite": true` with `"noEmit": false`
overriding `tsconfig.base.json`, and name root-level sources directly — `shared/pages-access`
lists `"../../cache/cache.ts"` and `"../../page/property/declarations.ts"` under `"rootDir": "../.."`.

Not established: which single project emits in place. All thirteen name `declarationDir: "dist"`, so
no config of theirs explains a declaration landing beside its source.

Three answers stand open, with different owners: stop emitting into the source tree, ignore the
emissions, or stop tracking this one file, which would leave it an untracked emission like its
sixty-nine siblings and so out of `diff-index`'s reach.
