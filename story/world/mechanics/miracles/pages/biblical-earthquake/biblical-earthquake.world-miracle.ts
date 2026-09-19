import type { WorldMiracle } from "akasha/story/world/mechanics/miracles/world-miracle.page-type.types.ts"

export const biblicalEarthquake = {
  id: "01a0655a-7b7c-7044-8885-4c8e007eecb5",
  type: "page-type/world-miracle",
  slug: "biblical-earthquake",
  title: "Biblical Earthquake",
  world: "world/the-wandering-inn",
} as const satisfies WorldMiracle
