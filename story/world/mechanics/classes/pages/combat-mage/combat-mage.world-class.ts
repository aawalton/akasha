import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const combatMage = {
  id: "01a0657e-134c-72bc-a852-6041d99b0b64",
  type: "page-type/world-class",
  slug: "combat-mage",
  title: "Combat Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
