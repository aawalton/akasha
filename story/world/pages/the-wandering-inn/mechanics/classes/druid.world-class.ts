import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const druid = {
  id: "01a0657e-01d4-77c5-bd6c-7299beb36c27",
  type: "page-type/world-class",
  slug: "druid",
  title: "Druid",
  world: "world/the-wandering-inn",
  aliases: ["druids"],
  evolvesFromSlugs: ["mage"],
  evolvesToSlugs: ["druid-of-the-lucky-world-child-of-omens-ember-of-the-eternal-solstice"],
  references: "jsonl",
} as const satisfies WorldClass
