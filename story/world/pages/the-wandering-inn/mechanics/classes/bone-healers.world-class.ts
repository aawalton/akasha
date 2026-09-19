import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const boneHealers = {
  id: "01a0657e-01bf-7798-a95f-6a10c9ef89a9",
  type: "page-type/world-class",
  slug: "bone-healers",
  title: "Bone Healers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
