import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message59a7d91762f5 = {
  id: "01a0c51a-e6fb-7000-8c2c-59a7d91762f5",
  type: "page-type/message",
  slug: "message-59a7d91762f5",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at edf0186ed49f736601d1a0283f23b1ad50945c73 found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 13 times:\n  addon/community/modules/addon-download/addon-download.module.referenced-by — the index entry for this file is in the index differing from what its page says\n  addon/community/modules/addon-update-plan/addon-update-plan.module.referenced-by — the index entry for this file is in the index differing from what its page says\n  addon/community/modules/esoui-catalog/esoui-catalog.module.referenced-by — the index entry for this file is in the index differing from what its page says\n  addon/community/modules/install-named-addon/install-named-addon.module.referenced-by — the index entry for this file is in the index differing from what its page says\n  addon/community/modules/installed-addons/installed-addons.module.referenced-by — the index entry for this file is in the index differing from what its page says\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
