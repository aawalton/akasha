import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message89214724c3e0 = {
  id: "01a095a6-56bf-7000-8b36-89214724c3e0",
  type: "message",
  slug: "message-89214724c3e0",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`workstation-deploying` is broken. workstation-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u workstation-deploying.service`.\n",
} as const satisfies Message
