import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const perfectPassive = {
  id: "01a05e18-1fd4-7520-aa16-bcd3f25957a8",
  pageTypeSlug: "sentence-shape",
  slug: "perfect-passive",
  definition: "a passive verb under `have`",
  rules: ["VP -> AUX BE VEN | AUX BE VEN PP"],
} as const satisfies SentenceShape
