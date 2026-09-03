import type { WorldClass } from "../../world-class.page-type.ts"

export const knight = {
  id: "01a0657e-0217-7df5-a25a-89552eeb0058",
  pageTypeSlug: "world-class",
  slug: "knight",
  title: "Knight",
  worldSlug: "the-wandering-inn",
  aliases: ["knights"],
  evolvesToSlugs: ["knight-seeker-of-the-silver-dragon"],
  references: "jsonl",
} as const satisfies WorldClass
