import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const sharpDame = {
  id: "01a0657e-0254-75d4-bfb0-2e19afb246e4",
  type: "world-class",
  slug: "sharp-dame",
  title: "Sharp Dame",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["incestuous-lady"],
  references: "jsonl",
} as const satisfies WorldClass
