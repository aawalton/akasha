import type { Finding } from "../finding.page-type.ts"

export const aMoveThatBreaksAnImportKillsTheLiveService = {
  id: "01a05f21-9be3-70e7-b011-c79968564395",
  pageTypeSlug: "finding",
  slug: "a-move-that-breaks-an-import-kills-the-live-service",
  domainSlug: "workspace-package/command-system",
  claim:
    "`akasha move` runs no check, and `pages-system-service` reloads from the checkout on every commit, so one move that breaks an import kills the live service before whoever made the move can repair the break. Alan's widgets answered nothing for about four minutes on 1 September while `where-testing` was rehomed.",
  evidence:
    "The move landed at 16:32:54. `page-asking.module.code.ts` was left importing `@akasha/pages-query/where-testing`, which resolved to nothing, because that module had just left that package. The unit watches the checkout: it restarted 30 times in 8 seconds and systemd gave up at 16:33:02 with `Start request repeated too quickly`. Nothing answered `/ask` until `c34d88c96f` repaired the import and the unit was reset and started again.\n\nTwo properties combine into something worse than either alone. `akasha move` and `akasha remove` both answer `no check ran: this landing was made by a program rather than by an agent`, so no typecheck weighs the tree a move leaves behind. And the service reloads from the commit rather than from a build, so a broken tree reaches production in the same second it lands.\n\nWhoever made the move cannot repair the break inside that window. The repair is itself an `akasha write`, which takes longer to compose than the restart loop takes to exhaust systemd's limit, so the unit has already failed by the time the second command is entered. The repair then needs `reset-failed` before it can start, which is a step nobody expects to need.\n\nWhat would close this: a move naming service code lands together with the edits that keep the tree resolving, as one act. `akasha edit` already refuses an intermediate state that does not typecheck. `akasha move` does not, and the two commands are held to different bars while landing into the same live checkout.\n\nThe three commits are `124a6d5dd8` for the move, `c34d88c96f` for the repair, and `2e47e84498`.",
} as const satisfies Finding
