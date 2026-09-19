import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bloodglassMage = {
  id: "01a0657e-133f-7280-9f80-04277fe6e2ce",
  type: "page-type/world-class",
  slug: "bloodglass-mage",
  title: "Bloodglass Mage",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["sand-mage"],
  references: "jsonl",
} as const satisfies WorldClass
