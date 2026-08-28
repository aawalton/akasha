---
id: bbe4e722-1620-5b57-bca7-a3766ad854e7
page-type-slug: finding
title: "The build reported an error no commit ever held"
domain-slug: domain/checks-system
---

# Claim

`tsc -b` reads the working tree and its own incremental store. It never reads a commit.

On 2026-08-28 it reported twenty-one errors describing a state that no commit ever held and that never existed on disk as a whole. The output carried real file paths and real line numbers. It propagated to six places before anyone opened a source file.

Every other account of this instrument being wrong is green over something broken. This one is red over something fine, and it costs more, because a reader told a check passed may still go and look, while a reader handed a compiler error with a line number in it stops looking and starts working around it.

A reading of `tsc -b` is worth quoting only from `--force`, and only against a clean working tree. Naming the commit it was taken at concedes the thing that is not true.

# Evidence

Observed 2026-08-27 into 2026-08-28 by seats astra and amy.

An agent capturing `bunx tsc -b --force` reported exit 2 and named `shared/utils-sync/src/page-type-props.ts(2,15): TS2305`, `@shared/pages-core/types` has no exported member `StorageTier`. A later capture in the same window held twenty-one errors, a different set, including `page/index/relation/relation.ts(7,28): TS6307` naming a `pages-system` file not listed by `shared/pages-access/tsconfig.json`.

Neither set survived. `bunx tsc -b` and `bunx tsc -b --force` both return exit 0 with no output, on a clean tree, 0 ahead and 0 behind origin.

The git history settles it rather than the timing. `292f60a42` adds both sides in one commit: `STORAGE_TIERS` and `StorageTier` to `shared/pages-core/src/types.ts`, and the import naming it to `shared/utils-sync/src/page-type-props.ts`. At the preceding bulk move `0e6982101` the importing file did not name `StorageTier` at all. No commit held the import without the export. The break was in the incremental store, where one package had been compiled against a sibling's earlier declaration file.

The propagation is the part worth recording. The first capture became a claim to a second seat that a real error passed through `ops checks audit typecheck` and did not pass through the build, a gap in the instrument in the direction nobody expected. That seat spent an hour on it. It was withdrawn, then restated from commit subjects and timestamps as a real hour-long break in main, then withdrawn again once the two commits were opened and read. Separately the same capture became a line in five agent briefs saying the build was red with twenty-one errors that were not theirs and could not be trusted in either direction.

Six statements, every one confident, every one false, none checked against a source file until the seventh reading.

What stopped it both times was opening a file. One seat noticed that `StorageTier` was present in the source while the story said it was absent, and followed the detail rather than the story; the withdrawal that followed was itself reversed by reading the two commits. Nothing in the corpus stopped it, including a finding about summaries carrying claims their evidence does not support, filed four hours earlier by the seat that then did it.

Not measured: how many other readings of this instrument are carried in documents written on these two days. A phantom error leaves no trace once the store is rebuilt.
