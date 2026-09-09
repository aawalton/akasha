import type { Message } from "../message.page-type.ts"

export const messageAa41eadee68e = {
  id: "01a08305-5b81-7000-90c6-aa41eadee68e",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-aa41eadee68e",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`send-due-reminders` is broken. send-due-reminders.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u send-due-reminders.service`.\n",
} as const satisfies Message
