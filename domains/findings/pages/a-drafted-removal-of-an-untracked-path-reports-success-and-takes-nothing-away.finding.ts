import type { Finding } from "../finding.page-type.ts"

export const aDraftedRemovalOfAnUntrackedPathReportsSuccessAndTakesNothingAway = {
  id: "01a07234-be81-773b-ba2c-8ce58e8d1b0a",
  pageTypeSlug: "finding",
  slug: "a-drafted-removal-of-an-untracked-path-reports-success-and-takes-nothing-away",
  domainSlug: "domain/change",
  claim:
    "`akasha write --remove` naming a path git does not track answers `drafted` and exits 0 while leaving the file on disk. A patch is a diff against HEAD, so a path HEAD carries no body for makes no hunk, and the removal falls out of the patch with nothing said. The untracked files beside a page go the same silent way, and every seat has one, since each uncommitted property is a file beside its page.",
  evidence:
    "Run live at the akasha root. `printf 'probe' > command-system/landing/dalla-probe.uncommitted.ts` makes a path git ignores. `akasha write --remove command-system/landing/dalla-probe.uncommitted.ts --message probe` answers `drafted command-system/landing/dalla-probe.uncommitted.ts`, then `8 checks judged the 1 path the patch would leave, and none refused`, then `the patch was worked out to nothing and taken away`, and exits 0. The file is on disk after. `git status --porcelain --ignored seat-system/seats/pages/` lists 16 ignored `.uncommitted.ts` files, one beside each seat page, so a seat removed this way leaves its own behind. Two tests in `commands/write` fail on this: `a path git does not track is taken away where --remove names it` reads the refusal `nothing is drafted here, so no patch is kept` where it wants none, and `a file beside a path taken away goes with it, tracked or not, warranted by nobody` finds the loose file left. Both passed before the change commands drafted. The cause is in `commands/write/write.command.code.ts`: `removingIn` pushes `{ path, body: null }`, `besideTaken` pushes the same for each beside file, and `writing` hands them to `landingAsked` with `draft: true`; a null body against a HEAD carrying no body is no change at all. `akasha remove` is untouched, since the three mechanical commands are not routed through the patch yet. The carry a patch already holds is the shape that fits, a carry being a move on disk that goes into no commit, but that is a block shape rather than a defect, so Alan settles it.",
} as const satisfies Finding
