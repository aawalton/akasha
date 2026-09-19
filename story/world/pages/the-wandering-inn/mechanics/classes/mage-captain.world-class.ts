import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mageCaptain = {
  id: "01a0657e-0221-70bd-a17c-136351b4f375",
  type: "page-type/world-class",
  slug: "mage-captain",
  title: "Mage Captain",
  world: "world/the-wandering-inn",
  aliases: ["Mage-Captain"],
  references: "jsonl",
} as const satisfies WorldClass
