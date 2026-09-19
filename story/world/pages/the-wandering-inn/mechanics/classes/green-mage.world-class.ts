import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const greenMage = {
  id: "01a0657e-136e-710e-92fe-bdda389179c3",
  type: "page-type/world-class",
  slug: "green-mage",
  title: "Green Mage",
  world: "world/the-wandering-inn",
  aliases: ["green-mages"],
  evolvesToSlugs: ["bloodearth-mage"],
  references: "jsonl",
} as const satisfies WorldClass
