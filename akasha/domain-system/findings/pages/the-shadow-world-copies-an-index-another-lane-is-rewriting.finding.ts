import type { Finding } from "../finding.page-type.ts"

export const theShadowWorldCopiesAnIndexAnotherLaneIsRewriting = {
  id: "01a06349-4211-722f-8ad4-80156eba495d",
  pageTypeSlug: "finding",
  slug: "the-shadow-world-copies-an-index-another-lane-is-rewriting",
  domainSlug: "module/code-tests",
  claim:
    "The check that runs a change's tests copies the page index into the world it makes with one recursive copy, guarded only by the index root being there. Another lane rewriting the index wholesale takes a folder away mid-copy, the copy throws `ENOENT ... getdents64`, and the check refuses the landing. The refusal names the index rather than the change, so it reads as a fault in the code being judged. A bare retry clears it every time.",
  evidence:
    "Hit twice on 2 September while landing the reader migration. The throw, verbatim but for the index root, which is written here as `<index>` because a path into the index is asked of `index-reading` rather than spelt:\n\n`ENOENT: no such file or directory, getdents64 '<index>/path/akasha/temper' (called from 242:7, akasha/checks/code-checks/pages/tests-pass/tests-pass.code-check.code.ts:83:17)`\n\nThe race was confirmed rather than guessed. The folder was there when I looked straight after, and every entry beside it under the `path` index's `akasha` folder carried one mtime seconds old, so that whole tree had just been rewritten. A temper ablation was running beside this work at the time.\n\n`tests-pass.code-check.code.ts:83` is `worldOf(change.root, over, change.after, shadow.filed())`. In `code-tests`, `worldOf` reaches `cpSync(index, to, { recursive: true })` under a single `existsSync(index)` on the index root. Nothing below that root is asked about, and nothing catches a fault arriving from the source moving while the copy walks it.\n\nThe `code-tests` module page already says a world borrows, and that what is borrowed is skipped where what is borrowed is not there. The index copy is the one borrow that does not obey it: absence is judged once, up front, for a whole tree that is being rewritten underneath.\n\nLine numbers in `code-tests.module.code.ts` moved between the run and this reading, so the frame at 242 is quoted as it was thrown rather than as read today. The `cpSync` and its lone guard are what I read today.",
} as const satisfies Finding
