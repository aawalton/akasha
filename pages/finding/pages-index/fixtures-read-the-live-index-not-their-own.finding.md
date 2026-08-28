---
page-type-slug: finding
slug: fixtures-read-the-live-index-not-their-own
title: "A fixture-backed test reaches the live repository's page index rather than its fixture's, and passes on page types its fixture never declared"
domain-slug: domain/pages-index
---

# Claim

A fixture-backed test that reaches the page index reads the live repository's index, not its fixture's. `tools/tests/fixture.ts` sets `AKASHA_ROOT` to its temp root, but `indexRoot()` holds the answer it worked out on the process's first ask and never asks again, so the index stays wherever it was first resolved — in a `bun test` batch, the live checkout. The fixture's root is honoured by every other reader and ignored by this one.

Two consequences stand together, and neither is visible from the other.

The first is the one that shows: `tools/tests/relations-resolve.test.ts` and `tools/tests/domain-edges.test.ts` do want an index of their own, so they set `AKASHA_ROOT` and check whether it took. It does not, for whichever of them is not first, and `anchorIndex` refuses rather than replacing the live index with four fixture rows. That is 36 of the 143 tests failing in `ops tests run tools` — the largest single named cause in the tree.

The second does not show at all: every other fixture-backed test that reaches the index is answered from the live repository. Those tests pass, and they pass on page types their fixture never declared.

Making `indexRoot` hold its answer against the root it was worked out for fixes the first and exposes the second. Measured: the 36 refusals go to 0, and 41 tests across 7 files begin failing on `scan.ts`'s refusal that the index was not built over the repository asked about — the count of that refusal over a full run going from 3 to 93. Those 41 are not new defects. They are tests that were passing by reading a repository they were not testing.

The refusal is right and wants no change: a fixture carrying no index must not answer as a repository with no pages. What the two cannot both have is one process-wide index root and fixtures that each need their own. Which way that resolves — fixtures carrying an index, or fixture-backed tests not reaching the index at all — is a larger piece than the memo, and is the decision this records.

# Evidence

Measured on 2026-08-28 on this workstation.

WHERE THE ROOT IS DROPPED. `page/index/place/place.ts:50-59` holds `let held: string | null` and opens `indexRoot` with `if (held !== null) return held`. `akashaStands()` at lines 20-34 reads `process.env.AKASHA_ROOT` afresh on every call, so the function's input can move while its answer cannot. `tools/tests/fixture.ts:100-102` sets `process.env.AKASHA_ROOT = root` for every fixture and restores it at lines 159-161.

THE 36. `ops tests run tools` on `main` at `56d9e6fa4`, output at `/var/tmp/akasha-tools-run-1.txt`: 143 `(fail)` lines over 31 test files. Of those, 36 carry `the page index stands at /var/home/walton/repos/akasha/.git/pages/index, outside this file's anchor at /tmp/...` — 23 from `relations-resolve.test.ts` and 13 from `domain-edges.test.ts`, which is every case in both files. Run alone, each passes (13/13 and 23/23); run as a pair, the second to load fails whole.

Only two files call `anchorIndex`, so this cause is closed at those two.

WHAT THE FIX DID. `indexRoot` keyed on the root it resolved against, landed at `dda0dad` and reverted at `b392b7d`. With it in place the pair run together gives 36 pass / 0 fail, and the live index is unchanged across the run at 59,076 rows. Positive control at the parent commit `0d623037a`, in a worktree, same command: 23 fail, each naming the anchor refusal.

WHAT IT EXPOSED. Full run with the fix in place, output at `/var/tmp/akasha-tools-run-2.txt`: 148 `(fail)` lines over 36 files. The anchor cause is gone — `grep -c` for it returns 0, from 36. Seven files begin failing that did not before: `compose-seat-name` (9), `seat-answering` (8), `hold-seat-mode` (7), `category-rules-disjoint` (6), `hold-seat-warrants` (4), `category-rules-cover` (4), `hold-seat-order` (2), with `compose-subagent` going 4 to 5 — 41 in all.

Every one refuses through `scan.ts`, e.g. from `hold-seat-mode`:

```
error: the page index was not built over `code-editor`, so a scan of pages/page-type/**/*.page-type.md, ... has nothing to read there.
      at page/index/scan/scan.ts:52
      at scanIn (page/page-types.ts:105)
      at indexedPaths (page/property/registry.ts:119)
      at registryOf (page/property/registry.ts:24)
      at stemsIn (tools/lib/seat-resolve.ts:61)
```

Occurrences of that refusal over the whole run go from 3 to 93.

THAT THESE ARE NOT NEW DEFECTS. `tools/tests/hold-seat-mode.test.ts` run on its own fails 7 of 7 at the fix commit AND at its parent `0d623037a` (worktree, `AKASHA_ROOT` pointed at the live checkout). It only passes inside the batch, where something earlier pinned `indexRoot` to the live index before the fixture asked. `page/property/registry.ts:20-27` builds the page-type registry out of the index, so what the fixture declares is never what the registry holds.

THAT THE LIVE INDEX IS INTACT. `built-from.json` under the live index names both `akasha` and `code-editor`; `pages.jsonl` stood at 59,076 rows before and after every run above. `anchorIndex`'s refusal did its job throughout — no fixture write reached the live index.
