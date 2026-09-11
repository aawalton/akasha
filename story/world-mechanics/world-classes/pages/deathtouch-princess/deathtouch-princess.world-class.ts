import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const deathtouchPrincess = {
  id: "01a0657e-1351-79f6-8dd0-4540e1366baa",
  type: "world-class",
  slug: "deathtouch-princess",
  title: "Deathtouch Princess",
  world: "the-wandering-inn",
  evolvesToSlugs: ["cursed-princess"],
  references: "jsonl",
} as const satisfies WorldClass
