import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSympathyForMagic = {
  id: "01a0e9f7-dffb-7fd0-a577-7fa8b779e039",
  type: "page-type/world-mechanic",
  slug: "super-supportive-sympathy-for-magic",
  title: "Sympathy for Magic",
  world: "world/super-supportive",
  description:
    "A stat that makes magical objects easier to use and pulls the mind toward magic items and sigils.",
} as const satisfies WorldMechanic
