import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message3d98da07a34a = {
  id: "01a0ba70-3207-7000-8c21-3d98da07a34a",
  type: "page-type/message",
  slug: "message-3d98da07a34a",
  to: "seat/alan",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at c79a0d6cc93c5853adb20c23438404d44815f70d found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 6 times:\n  seat/pages/alan/alan.seat.referenced-by — the index entry for this file is named by a page and missing from the index\n  role/pages/definer.role.referenced-by — the index entry for this file is in the index differing from what its page says\n  seat/log-day/seat-log-day.page-type.referenced-by — the index entry for this file is in the index differing from what its page says\n  seat/log-source/pages/oauth-proxy-console.log-source.referenced-by — the index entry for this file is in the index differing from what its page says\n  seat/seat.page-type.referenced-by — the index entry for this file is in the index differing from what its page says\nwhat each of them answered is on the newest row of the audit log beside that check's page. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
