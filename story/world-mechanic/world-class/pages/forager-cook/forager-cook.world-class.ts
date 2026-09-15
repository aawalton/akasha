import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const foragerCook = {
  id: "01a0657e-01de-76de-8c90-74b164e3604a",
  type: "world-class",
  slug: "forager-cook",
  title: "Forager Cook",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["cook"],
  references: "jsonl",
} as const satisfies WorldClass
