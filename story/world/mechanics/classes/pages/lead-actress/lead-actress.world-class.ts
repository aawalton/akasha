import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const leadActress = {
  id: "01a0657e-138d-7c10-99c9-6c1817d63ff4",
  type: "page-type/world-class",
  slug: "lead-actress",
  title: "Lead Actress",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["actress"],
  references: "jsonl",
} as const satisfies WorldClass
