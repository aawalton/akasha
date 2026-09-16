import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageBed2c3bf6be0 = {
  id: "01a0a803-173e-7000-8bdd-bed2c3bf6be0",
  type: "page-type/message",
  slug: "message-bed2c3bf6be0",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at dedd11ad78f4e7bdbe926a0814461f6db403cc54 found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 2 times:\n  ios-app/pages/atlas/atlas.ios-app.referenced-by — the index entry for this file is in the index differing from what its page says\n  harness/mobile-cli/mobile-cut/pages/atlas-36/atlas-36.mobile-cut.carried — the index entry for this file is in the index and named by no page\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
