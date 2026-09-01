import type { Finding } from "../finding.page-type.ts"

export const theOpsCommandsAreOffWhileTheirServicesRun = {
  id: "01a05a59-38f4-74c3-98d4-6878660ffa01",
  pageTypeSlug: "finding",
  slug: "the-ops-commands-are-off-while-their-services-run",
  domainSlug: "domain/akasha-migration",
  claim:
    "The `ops` command refuses every call, while the workstation services it installed keep running on their timers. Nothing can write a reminder or a question through the command built for it, but anything already standing on disk is still picked up and acted on a minute later. The reading half is off and the acting half is on.",
  evidence:
    "Any `ops` call answers `The ops CLI is turned off. Use the ordinary tools instead: read and write files with the file tools, search with ripgrep, run git directly.` and exits non-zero. Meanwhile `systemctl --user list-timers` shows `send-due-reminders.timer` firing every minute, and `systemctl --user list-units` shows `recipient-resolver.service` loaded, active and running. `services/send-due-reminders.ts` reads reminder pages off disk, asks `systemd-analyze calendar` for the next firing, and writes a message; it never calls `ops`. So a reminder page written by hand at `pages/reminder/<to>/<uuidv7>.reminder.md`, in the shape `tools/lib/reminder-file.ts:49-70` composes, is armed on its next tick and delivered exactly as one set through the command would have been. I wrote one that way rather than going without. The same split holds for questions: `tools/commands/ask-alan.ts` cannot run, so nothing can reach Alan through it, though `pages/message/` still has 16 standing inboxes that the resolver drains. Worth knowing before something is built on the assumption that either half is settled: the commands are off, the daemons are not, and which of the two is the intended state is not written down anywhere I found.",
} as const satisfies Finding
