import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message4989dc7ef378 = {
  id: "01a0c64e-215b-7000-a026-4989dc7ef378",
  type: "page-type/message",
  slug: "message-4989dc7ef378",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at b0f167aac9198d90462d28ef956b66c062e7acf1 found 1 check newly refusing.\n`key-names-one-property` refused 1 time:\n  story/game/location/game-location.page-type.ts — keys `description` to `text-property/location-description` declared by `game-location` and to `text-property/description` declared by `page` — one key names one property, and no narrowing mak... (21 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
