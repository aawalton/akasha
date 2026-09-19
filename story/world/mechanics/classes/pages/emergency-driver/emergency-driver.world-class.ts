import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const emergencyDriver = {
  id: "01a0657e-01d6-78a0-bfe6-32a095f59a76",
  type: "page-type/world-class",
  slug: "emergency-driver",
  title: "Emergency Driver",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
