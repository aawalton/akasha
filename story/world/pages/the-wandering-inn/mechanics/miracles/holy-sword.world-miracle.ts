import type { WorldMiracle } from "akasha/story/world/mechanics/miracles/world-miracle.page-type.types.ts"

export const holySword = {
  id: "01a0655a-7b7c-791a-a216-650d972d3e94",
  type: "page-type/world-miracle",
  slug: "holy-sword",
  title: "Holy Sword",
  world: "world/the-wandering-inn",
} as const satisfies WorldMiracle
