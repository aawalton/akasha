import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageFc92ebea6f3b = {
  id: "01a09326-7011-7000-949e-fc92ebea6f3b",
  type: "message",
  slug: "message-fc92ebea6f3b",
  to: "thea",
  from: "service-watching",
  warrant: "announce",
  body: "`audit-running` is broken. audit-running.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u audit-running.service`.\n",
} as const satisfies Message
