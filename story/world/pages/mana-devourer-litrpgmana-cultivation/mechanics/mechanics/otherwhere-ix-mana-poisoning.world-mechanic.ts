import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxManaPoisoning = {
  id: "01a0ea38-1b54-7f3b-9891-9ac419f07785",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-mana-poisoning",
  title: "Mana Poisoning",
  world: "world/mana-devourer-litrpgmana-cultivation",
  description: "A sickness, graded I to V, of a body holding more mana than its capacity.",
} as const satisfies WorldMechanic
