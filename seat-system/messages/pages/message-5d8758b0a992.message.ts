import type { Message } from "../message.page-type.types.ts"

export const message5d8758b0a992 = {
  id: "01a0888b-ea88-7000-a2a2-5d8758b0a992",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-5d8758b0a992",
  to: "elin",
  from: "service-watching",
  warrant: "announce",
  body: "`great-courses-sync` is broken. great-courses-sync.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u great-courses-sync.service`.\n",
} as const satisfies Message
