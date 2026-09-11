import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const sandMage = {
  id: "01a0657e-024a-78a2-b46d-8041a8bd32a9",
  type: "world-class",
  slug: "sand-mage",
  title: "Sand Mage",
  world: "the-wandering-inn",
  aliases: ["sand-mages"],
  evolvesToSlugs: ["bloodglass-mage"],
  references: "jsonl",
} as const satisfies WorldClass
