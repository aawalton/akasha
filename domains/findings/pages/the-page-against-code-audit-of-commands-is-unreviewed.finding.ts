import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const thePageAgainstCodeAuditOfCommandsIsUnreviewed = {
  id: "01a09124-b9e2-746a-8af4-128263eace32",
  type: "finding",
  slug: "the-page-against-code-audit-of-commands-is-unreviewed",
  domain: "page-type/command",
  claim:
    "An audit read every command page against the code beside it, asking where the two disagree, and proposed fourteen things that are not so and should be. Six have landed as intents on `initiative/athena-commands-cleanup`: help answering from the page, the `taking` fields, the aliases those fields would carry, the one spelling a command is told, that a command has no change kind, which absorbed two of the fourteen, and that no call refreshes the index on its own. Two about the seconds a command is allowed went to Aine and are hers. One was ruled no intent, because the export a command's code offers is named from its slug by the rule every page already follows. One was mended outright rather than carried: no command's code spells its own call, which is routing's to say. Three are still unreviewed.",
  evidence:
    'Unreviewed, each with what it rests on.\n\n1. The nine email flag descriptions exist once. `alan/google/email/email-command-help/email-command-help.module.code.ts:6` and `:24` have no importers; the twelve email commands import `email-command-reading` instead. The same nine flags are described again in `taking` on `email-messages-send.command.ts:11-29` and `email-drafts-create.command.ts:11-29`, in different words. Deleting the dead module must follow the `taking` fields landing, or the only surviving record of `required` and `repeat` for email goes with it.\n\n2. A check refuses a command whose code spells a flag its page states. The only check over commands is placement, and `command-is-in-the-right-folder.code-check.decision.code.ts:55-56` returns null for a command no page names among its parts. Nothing compares `taking` to code, which is why the other faults here ran unnoticed.\n\n3. `loadedBy: "module/calling"` at `commands/command.page-type.ts:125` is honest about reachability — every command has its page, its part and its code — but the property is inert, appearing in no code file anywhere. No intent is proposed for it: a check for a case not here yet earns nothing.',
} as const satisfies Finding
