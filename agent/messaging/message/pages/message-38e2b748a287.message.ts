import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message38e2b748a287 = {
  id: "01a0c517-ebf8-7000-864c-38e2b748a287",
  type: "page-type/message",
  slug: "message-38e2b748a287",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 380ef2786afca7090210c0efbe87d37123b8fd5b found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 3 times:\n  web/modules/build-metadata/build-metadata.module.referenced-by — the index entry for this file is in the index differing from what its page says\n  web/modules/ttc-listing-client/ttc-listing-client.module.referenced-by — the index entry for this file is in the index differing from what its page says\n  web/modules/use-player/use-player.module.referenced-by — the index entry for this file is in the index differing from what its page says\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
