import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const plagueDoctor = {
  id: "01a0657e-023d-7b40-ba02-ec67fe2b79fa",
  type: "page-type/world-class",
  slug: "plague-doctor",
  title: "Plague Doctor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
