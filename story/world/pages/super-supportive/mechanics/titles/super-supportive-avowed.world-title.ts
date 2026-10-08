import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveAvowed = {
  id: "01a0e9f0-a7e3-775f-9e86-1a71c144a5b2",
  type: "page-type/world-title",
  slug: "super-supportive-avowed",
  title: "Avowed",
  world: "world/super-supportive",
  aliases: ["superhuman", "super"],
  description: "The proper name for a person chosen by the System who has accepted the Contract.",
  createdAt: "2026-09-28T21:34:18.083Z",
  updatedAt: "2026-09-28T21:34:20.000Z",
} as const satisfies WorldTitle
