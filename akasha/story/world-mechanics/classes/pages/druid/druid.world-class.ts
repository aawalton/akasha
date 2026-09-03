import type { WorldClass } from "../../world-class.page-type.ts"

export const druid = {
  id: "01a0657e-01d4-77c5-bd6c-7299beb36c27",
  pageTypeSlug: "world-class",
  slug: "druid",
  title: "Druid",
  worldSlug: "the-wandering-inn",
  aliases: ["druids"],
  evolvesFromSlugs: ["mage"],
  evolvesToSlugs: ["druid-of-the-lucky-world-child-of-omens-ember-of-the-eternal-solstice"],
  references: "jsonl",
} as const satisfies WorldClass
