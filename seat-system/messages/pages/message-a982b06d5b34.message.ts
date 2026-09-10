import type { Message } from "../message.page-type.types.ts"

export const messageA982b06d5b34 = {
  id: "01a08237-6115-7000-8b19-a982b06d5b34",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-a982b06d5b34",
  to: "akasha",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`.\n",
} as const satisfies Message
