import type { WorldMiracle } from "akasha/story/world/mechanics/miracles/world-miracle.page-type.types.ts"

export const theSkyIsFalling = {
  id: "01a0655a-7b7c-7060-b680-48839937842c",
  type: "page-type/world-miracle",
  slug: "the-sky-is-falling",
  title: "The Sky is Falling",
  world: "world/the-wandering-inn",
} as const satisfies WorldMiracle
