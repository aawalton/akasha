import type { Finding } from "../finding.page-type.ts"

export const mergingTheTwoLandingLocksLetsTheHarnessStealALiveAkashaHold = {
  id: "01a06578-445f-77c8-8f2a-4cdb8a31a9fd",
  pageTypeSlug: "finding",
  slug: "merging-the-two-landing-locks-lets-the-harness-steal-a-live-akasha-hold",
  domainSlug: "workspace-package/git",
  claim:
    "The harness landing lock and the akasha landing lock sit in one `.git` folder under different names, so a rename is all that parts them. A rename alone would not be safe. The harness reads a lock's mark with `Number` over the whole line, and the akasha mark carries two fields, so the harness would read a live akasha hold as unheld and delete it.",
  evidence:
    'Measured 2026-09-02 at commit 923a2f4fde.\n\n`repo/git/git.ts` line 90 names the harness lock `harness-landing.lock`, and line 103 places it in `git rev-parse --git-common-dir`, which answers `.git` in this checkout. `akasha/command-system/holding/holding.module.code.ts` line 5 names the akasha lock `.git/akasha-landing.lock`. One folder, two names, so neither hold excludes the other while both commit paths run.\n\nThe two marks differ. `holding` line 40 writes `${pid} ${startedAt(pid)}`; `whileHoldingLanding` at git.ts line 121 writes `${pid}` and a newline. `repo/holder/holder.ts` line 6 reads a mark with `Number(readFileSync(path).trim())`. `Number("12345 998877")` is NaN, checked here at the shell, so line 10 answers that no holder runs, and git.ts lines 133 to 137 then remove the lock and take it. A rename therefore turns a lock the harness ignores into a lock the harness takes from a running akasha landing, under twenty concurrent writers.\n\nTwo more things gate the merge. git.ts line 155 releases only where the mark equals its own pid as a whole string, so writing the two-field mark without changing that line leaves every harness landing holding the lock for ever. And `tools/lib/page-commit-queue.ts` line 16 allows a landing 2000ms of patience, where an akasha landing waits 120s; sharing one lock with judged landings would drive the queue into the stall path at lines 28 and 151 and turn `landingsHealthy` at line 83 false.\n\nThe merge is three coordinated edits across `repo/git/git.ts` and `repo/holder/holder.ts`, not one rename. None of the three was made here.',
} as const satisfies Finding
