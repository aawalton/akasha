import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveChainer = {
  id: "01a0e9f2-9e33-71b1-8b50-90afbfc55981",
  type: "page-type/world-class",
  slug: "super-supportive-chainer",
  title: "Chainer",
  world: "world/super-supportive",
  description:
    "An ultra-rare class said to give access to the most powerful wordchains and to reduce their side effects.",
} as const satisfies WorldClass
