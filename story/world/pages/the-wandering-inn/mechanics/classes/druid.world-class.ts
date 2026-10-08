import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const druid = {
  id: "01a0657e-01d4-77c5-bd6c-7299beb36c27",
  type: "page-type/world-class",
  slug: "druid",
  title: "Druid",
  world: "world/the-wandering-inn",
  appearanceCount: 138,
  aliases: ["druids"],
  evolvesFromSlugs: ["world-class/mage"],
  evolvesToSlugs: [
    "world-class/druid-of-the-lucky-world-child-of-omens-ember-of-the-eternal-solstice",
  ],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.956Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
