import type { WorldAspect } from "akasha/story/world/mechanics/aspects/world-aspect.page-type.types.ts"

export const superSupportiveRejuvenation = {
  id: "01a0e9f0-79f4-7ce5-ab1b-2274a4c72bb2",
  type: "page-type/world-aspect",
  slug: "super-supportive-rejuvenation",
  title: "Rejuvenation",
  world: "world/super-supportive",
  aliases: ["full rejuve", "eternal youth"],
  description: "A healing treatment that keeps a person young.",
} as const satisfies WorldAspect
