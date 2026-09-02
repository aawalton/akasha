import type { Finding } from "../finding.page-type.ts"

export const theScratchSweepCopiesTheWholeAkashaFolder = {
  id: "01a0621b-8786-707f-bf01-fc50c824dfef",
  pageTypeSlug: "finding",
  slug: "the-scratch-sweep-copies-the-whole-akasha-folder",
  domainSlug: "domain/akasha",
  claim:
    "Two test files copy the whole `akasha/` folder into a scratch root and sweep it in an `afterAll` bounded by bun's 5s default: `indexing` copies it once, `cli` copies it ten times. The sweep is linear in the tree's file count and the tree only grows, so both fail by structure rather than by flake. Tonight's day-folder landing is not the cause.",
  evidence:
    "Measured 2026-09-02 over two trees under /var/tmp taken by `git archive`, holding no `.git` and no remote. e938f05d43 (01:25, before the landing) is 16673 files and 6794 directories; e412c1b4b9 (04:53) at 21891 and 9324. 248 interleaved cpSync/rmSync pairs, ordered ABBA so load drift falls on both: the head/pre sweep ratio is 1.320 median against a file-count ratio of 1.313, so the sweep is linear in files. Load rather than the tree sets the number: with the tree fixed, head sweeps ran 0.65s least, 1.11s median and 17.61s most over loads of 9 to 38. The 7.5s, 10.4s, 17.2s growth over successive runs that raised the suspicion sits inside that spread. The landing, 4a8e3ccb04, is 294 renames: 133 directories more, 399 bytes more, no new file; 80 pairs across it give a sweep ratio of 0.985 median, slower in 33 of 80 pairs. `checkoutOf` at cli.module.test.ts:47 is called ten times, each copying the folder (459MB) and running git init, add and commit over the copy; at the quiet one-copy cost of 0.9s that is some 9s against a 5s budget, and it failed 6 of 6 at both commits. indexing.module.test.ts:284 copies it once and timed out 5 of 5 before and 3 of 5 after. Two remedies: state a budget for the sweep, as indexing already states REBUILDING=60000 beside it, which hides a cost growing with every page added; or copy only the pages a test needs.",
} as const satisfies Finding
