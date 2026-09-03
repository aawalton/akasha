import type { WorldClass } from "../../world-class.page-type.ts"

export const skirmisher = {
  id: "01a0657e-0256-7026-99df-002a4d74e212",
  pageTypeSlug: "world-class",
  slug: "skirmisher",
  title: "Skirmisher",
  worldSlug: "the-wandering-inn",
  aliases: ["skirmishers"],
  evolvesToSlugs: ["brave-skirmisher"],
  references: "jsonl",
} as const satisfies WorldClass
