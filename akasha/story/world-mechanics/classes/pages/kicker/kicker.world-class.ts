import type { WorldClass } from "../../world-class.page-type.ts"

export const kicker = {
  id: "01a0657e-1378-708c-b7af-d881aeb5c2b4",
  pageTypeSlug: "world-class",
  slug: "kicker",
  title: "Kicker",
  worldSlug: "the-wandering-inn",
  aliases: ["kickers"],
  evolvesToSlugs: ["football-player"],
  references: "jsonl",
} as const satisfies WorldClass
