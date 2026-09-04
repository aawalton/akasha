import type { WorldClass } from "../../world-class.page-type.ts"

export const survivor = {
  id: "01a0657e-0262-778c-ae82-163484d094b4",
  pageTypeSlug: "world-class",
  slug: "survivor",
  title: "Survivor",
  worldSlug: "the-wandering-inn",
  aliases: ["survivors"],
  evolvesToSlugs: ["underworld-survivor"],
  references: "jsonl",
} as const satisfies WorldClass
