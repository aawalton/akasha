import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const guildmistressOfNorthernBlades = {
  id: "01a0657e-01ed-7a80-a5a2-eb27ee4dad02",
  type: "world-class",
  slug: "guildmistress-of-northern-blades",
  title: "Guildmistress of Northern Blades",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["vice-guildmistress"],
  references: "jsonl",
} as const satisfies WorldClass
