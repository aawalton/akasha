import type { WorldMiracle } from "akasha/story/world/mechanics/miracles/world-miracle.page-type.types.ts"

export const breathOfGiants = {
  id: "01a0655a-7b7c-7005-9e09-17bef9d42737",
  type: "page-type/world-miracle",
  slug: "breath-of-giants",
  title: "Breath of Giants",
  world: "world/the-wandering-inn",
} as const satisfies WorldMiracle
