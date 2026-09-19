import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const griffinRaider = {
  id: "01a0657e-136e-74ab-b4e6-ac6b487f4742",
  type: "page-type/world-class",
  slug: "griffin-raider",
  title: "Griffin Raider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
