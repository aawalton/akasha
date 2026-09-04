import type { WorldClass } from "../../world-class.page-type.ts"

export const adventurer = {
  id: "01a0657e-01a5-7594-ba0c-18a5f41f1f07",
  pageTypeSlug: "world-class",
  slug: "adventurer",
  title: "Adventurer",
  worldSlug: "the-wandering-inn",
  aliases: ["adventurers"],
  evolvesToSlugs: ["horrorbane-adventurer"],
  references: "jsonl",
} as const satisfies WorldClass
