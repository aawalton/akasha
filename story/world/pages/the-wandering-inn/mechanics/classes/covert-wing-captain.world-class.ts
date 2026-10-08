import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const covertWingCaptain = {
  id: "01a0657e-01cc-702d-a5f2-cef0da2040b1",
  type: "page-type/world-class",
  slug: "covert-wing-captain",
  title: "Covert Wing Captain",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-class/sister-of-the-unforgotten"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.948Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
