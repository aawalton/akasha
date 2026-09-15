import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const sniper = {
  id: "01a06586-0a45-781d-b28d-6a1f907ed931",
  type: "world-class",
  slug: "sniper",
  title: "Sniper",
  world: "world/the-wandering-inn",
  aliases: ["snipers"],
  evolvesFromSlugs: ["archer"],
  references: "jsonl",
} as const satisfies WorldClass
