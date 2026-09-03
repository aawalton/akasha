import type { WorldClass } from "../../world-class.page-type.ts"

export const viceGuildmistress = {
  id: "01a0657e-026e-74b3-9b45-2f68fd3689c3",
  pageTypeSlug: "world-class",
  slug: "vice-guildmistress",
  title: "Vice Guildmistress",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["experienced-receptionist"],
  evolvesToSlugs: ["guildmistress-of-northern-blades"],
  references: "jsonl",
} as const satisfies WorldClass
