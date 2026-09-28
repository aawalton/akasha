import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxQuests = {
  id: "01a0ea43-e442-7735-bea5-c05fab04646f",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-quests",
  title: "Quests",
  world: "world/mana-devourer-litrpgmana-cultivation",
  description: "A task the system records for a person, with its promised reward.",
} as const satisfies WorldMechanic
