import type { WorldClass } from "../../world-class.page-type.ts"

export const guildmistressOfNorthernBlades = {
  id: "01a0657e-01ed-7a80-a5a2-eb27ee4dad02",
  pageTypeSlug: "world-class",
  slug: "guildmistress-of-northern-blades",
  title: "Guildmistress of Northern Blades",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["vice-guildmistress"],
  references: "jsonl",
} as const satisfies WorldClass
