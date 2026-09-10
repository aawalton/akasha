import type { Message } from "../message.page-type.types.ts"

export const message8c2bbab2a0b2 = {
  id: "01a082bf-cc1c-7000-acb8-8c2bbab2a0b2",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-8c2bbab2a0b2",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`desktop-wallpaper-setting` is broken. desktop-wallpaper-setting.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u desktop-wallpaper-setting.service`.\n",
} as const satisfies Message
