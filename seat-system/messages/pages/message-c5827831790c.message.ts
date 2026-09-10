import type { Message } from "../message.page-type.types.ts"

export const messageC5827831790c = {
  id: "01a082b6-8bd2-7000-8b54-c5827831790c",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-c5827831790c",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`desktop-wallpaper-setting` is broken. desktop-wallpaper-setting.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u desktop-wallpaper-setting.service`.\n",
} as const satisfies Message
