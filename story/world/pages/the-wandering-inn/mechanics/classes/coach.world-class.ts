import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const coach = {
  id: "01a0657e-134b-79ab-a16e-b45c38b894cd",
  type: "page-type/world-class",
  slug: "coach",
  title: "Coach",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  evolvesToSlugs: ["world-class/famed-coach"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.427Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
