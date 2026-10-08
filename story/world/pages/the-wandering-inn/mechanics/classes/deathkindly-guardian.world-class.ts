import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const deathkindlyGuardian = {
  id: "01a0657e-01cf-7dd1-ae5c-fb85eb959c92",
  type: "page-type/world-class",
  slug: "deathkindly-guardian",
  title: "Deathkindly Guardian",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/skeleton-knight"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.951Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
