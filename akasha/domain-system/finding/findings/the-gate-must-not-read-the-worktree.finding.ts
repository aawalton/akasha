import type { Finding } from "../finding.page-type.ts"

export const theGateMustNotReadTheWorktree = {
  id: "01a04bdd-596d-70de-9a5d-dc54eb56b2c9",
  pageTypeSlug: "finding",
  slug: "the-gate-must-not-read-the-worktree",
  domainSlug: "domain/checks-system",
  claim: "Bodies now come from the base commit, but typecheck still takes the list of files to compile from the live working tree, so a file deleted from the worktree and never committed drops out of the judgement with nothing said.",
  evidence:
    "The body leak is closed. `leavingOf` falls through to `bodyAt`, which reads `git cat-file blob <base>:<path>`, and landing's page states it: a body the change does not touch is read from the base commit, never from the working tree. What still reads the worktree is which files there are. `rootsOf` seeds its set from `everyIn(leaving.root)`, a readdirSync walk of `akasha/` on disk, unions the change's own `.ts` paths, and keeps what `leaving.at` answers for. A path on disk but not at base is filtered out, correctly. A path at base but gone from the worktree is in neither set, so it is never a root, and `foundIn` reports diagnostics only for roots. Reproduced on a two-file repository: with `b.ts` standing, the roots are both files and its type error is reported; delete `b.ts` from the worktree alone, leaving it whole at HEAD, and the roots are `a.ts` only and the check answers clean. An uncommitted deletion in a shared worktree therefore hides that file's errors from every change judged while it stands. The honest root set is the base commit's tree listed once, and the batched reach into git that wanted now stands: the gate reads every body through a single `git cat-file --batch`, so listing the tree through it is one more request on a pipe that is already open.",
} as const satisfies Finding
