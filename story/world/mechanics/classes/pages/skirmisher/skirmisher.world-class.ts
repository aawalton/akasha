import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const skirmisher = {
  id: "01a0657e-0256-7026-99df-002a4d74e212",
  type: "page-type/world-class",
  slug: "skirmisher",
  title: "Skirmisher",
  world: "world/the-wandering-inn",
  aliases: ["skirmishers"],
  evolvesToSlugs: ["brave-skirmisher"],
  references: "jsonl",
} as const satisfies WorldClass
