import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldTitle = {
  id: "01a06558-a991-7a45-b681-fed7723c95e3",
  type: "page-type",
  slug: "world-title",
  definition: "a name the world gives a character for something they did",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
} as const satisfies PageType
