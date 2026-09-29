import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiNamedSpells = {
  id: "01a0ea85-f5f3-7fca-ae02-bea28832ea60",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-named-spells",
  title: "Named Spells",
  world: "world/the-calamitous-bob-stubbed",
  description: "The spells that casters of Nyil know by name.",
} as const satisfies WorldMechanic
