import type { Finding } from "../finding.page-type.ts"

export const emailUnsubscribeLostItsDryRunWhenItCarriedIntoAkasha = {
  id: "01a06864-e359-7001-a1c4-4175fb6d05c3",
  pageTypeSlug: "finding",
  slug: "email-unsubscribe-lost-its-dry-run-when-it-carried-into-akasha",
  domainSlug: "domain/akasha-migration",
  claim:
    "The carried `email-unsubscribe` command always fires, where the old ops command could be asked to say what it would do and stop, so the only rehearsal for an irreversible act is gone.",
  evidence:
    "tools/commands/email/unsubscribe.ts lines 38-41 printed the parsed intent and returned without firing when --dry-run was said, and pages/old-ops-command/ops-email-unsubscribe.old-ops-command.md line 20 documented that flag. akasha/google/email/commands/email-unsubscribe/email-unsubscribe.command.ts declares no such taking and carries the absence invariant 'Nothing here says what an unsubscribe would do without doing it.', so the loss is declared rather than accidental. Both old files were ablated at c87be387d011ae47c4176474e565760b7e95f056 and are recoverable from its parent. Whether the rehearsal is worth restoring is Alan's call, not a carry.",
} as const satisfies Finding
