import type { WorldClass } from "../../world-class.page-type.ts"

export const dancer = {
  id: "01a0657e-1351-7a29-bf2b-049196fd067c",
  pageTypeSlug: "world-class",
  slug: "dancer",
  title: "Dancer",
  worldSlug: "the-wandering-inn",
  aliases: ["dancers"],
  evolvesToSlugs: ["dancer-of-advent"],
  references: "jsonl",
} as const satisfies WorldClass
