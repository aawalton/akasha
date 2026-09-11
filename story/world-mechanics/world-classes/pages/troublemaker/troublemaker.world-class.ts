import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const troublemaker = {
  id: "01a06586-0a6d-7d14-adab-37121f0b52ea",
  type: "world-class",
  slug: "troublemaker",
  title: "Troublemaker",
  world: "the-wandering-inn",
  aliases: ["troublemakers"],
  references: "jsonl",
} as const satisfies WorldClass
