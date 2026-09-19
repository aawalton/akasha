import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const doctor = {
  id: "01a0657e-1356-74a2-88f3-e22145b34455",
  type: "page-type/world-class",
  slug: "doctor",
  title: "Doctor",
  world: "world/the-wandering-inn",
  aliases: ["doctors"],
  references: "jsonl",
} as const satisfies WorldClass
