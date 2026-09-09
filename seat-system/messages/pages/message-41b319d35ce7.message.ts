import type { Message } from "../message.page-type.ts"

export const message41b319d35ce7 = {
  id: "01a08230-f604-7000-b871-41b319d35ce7",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-41b319d35ce7",
  to: "akasha",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`.\n",
} as const satisfies Message
