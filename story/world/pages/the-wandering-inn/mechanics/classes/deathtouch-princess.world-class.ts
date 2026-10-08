import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const deathtouchPrincess = {
  id: "01a0657e-1351-79f6-8dd0-4540e1366baa",
  type: "page-type/world-class",
  slug: "deathtouch-princess",
  title: "Deathtouch Princess",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  evolvesToSlugs: ["world-class/cursed-princess"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.433Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
