import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message8177e3d82484 = {
  id: "01a09b37-d32d-7000-8de9-8177e3d82484",
  type: "message",
  slug: "message-8177e3d82484",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`workstation-deploying` is broken. workstation-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u workstation-deploying.service`.\n",
} as const satisfies Message
