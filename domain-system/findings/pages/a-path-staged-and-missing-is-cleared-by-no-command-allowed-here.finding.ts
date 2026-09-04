import type { Finding } from "../finding.page-type.ts"

export const aPathStagedAndMissingIsClearedByNoCommandAllowedHere = {
  id: "01a06057-e61c-7741-ad57-092899bac44b",
  pageTypeSlug: "finding",
  slug: "a-path-staged-and-missing-is-cleared-by-no-command-allowed-here",
  domainSlug: "workspace-package/command-system",
  claim:
    "A path staged as added, absent from the worktree and absent from HEAD, is cleared by no command allowed here. Remove weighs the worktree and answers that nothing was there to take away. The hook restoring a dirty akasha folder weighs the index and puts the path back as HEAD has it, from a HEAD that lacks it, so it fires again on the next call. Reset is refused, since in a worktree many agents share it drops work that is not the caller's. Each refusal is right on its own ground.",
  evidence:
    'The entry read `AD`. It fired the restore hook on every bash call, in every one of six lanes, for hours; three separate lanes reported the noise before anyone looked at it. None of the three could clear it either.\n\nThe sequence: `akasha remove` answered "already gone, so nothing was taken away for it" and wrote nothing. The restore hook answered "1 path went back as HEAD has it", which for a path HEAD does not carry is no act at all. `git reset` naming the one path was refused: "moves HEAD and can drop uncommitted work. The work it drops is not only yours." That refusal is correct where a worktree is shared, and it names asking Alan as the way out, which is a way out an agent working in his absence does not have.\n\nThe way out taken was to land the page in order to take it away: a body composed to the shape of its siblings and written at `d329989860`, then removed at `5e0997cd4a`. Two commits of churn for a path that was never meant to exist. The index is clean.\n\nWorth keeping from the second of those: the removal printed "no check ran: this landing was made by a program rather than by an agent". Remove is mechanical, so nothing judged the deletion. That is `runsChecks: false` on `change-mechanical`, seen on a real removal rather than in a fixture.',
} as const satisfies Finding
