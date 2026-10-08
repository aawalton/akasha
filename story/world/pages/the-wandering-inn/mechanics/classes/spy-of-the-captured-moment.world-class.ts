import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spyOfTheCapturedMoment = {
  id: "01a0657e-025e-731f-8f4d-c6c612717a97",
  type: "page-type/world-class",
  slug: "spy-of-the-captured-moment",
  title: "Spy of the Captured Moment",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-class/clandestine-spy"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.094Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
