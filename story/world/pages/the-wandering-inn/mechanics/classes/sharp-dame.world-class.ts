import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sharpDame = {
  id: "01a0657e-0254-75d4-bfb0-2e19afb246e4",
  type: "page-type/world-class",
  slug: "sharp-dame",
  title: "Sharp Dame",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-class/incestuous-lady"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.084Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
