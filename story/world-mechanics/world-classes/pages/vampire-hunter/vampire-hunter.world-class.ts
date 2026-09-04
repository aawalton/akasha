import type { WorldClass } from "../../world-class.page-type.ts"

export const vampireHunter = {
  id: "01a06586-0a6e-75dd-a5d5-c6433c536501",
  pageTypeSlug: "world-class",
  slug: "vampire-hunter",
  title: "Vampire Hunter",
  worldSlug: "the-wandering-inn",
  aliases: ["vampire-hunters"],
  evolvesFromSlugs: ["crossbow-speed-hunter"],
  references: "jsonl",
} as const satisfies WorldClass
