import type { WorldClass } from "../../world-class.page-type.ts"

export const deathtouchPrincess = {
  id: "01a0657e-1351-79f6-8dd0-4540e1366baa",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "deathtouch-princess",
  title: "Deathtouch Princess",
  world: "the-wandering-inn",
  evolvesToSlugs: ["cursed-princess"],
  references: "jsonl",
} as const satisfies WorldClass
