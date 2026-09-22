import type { HeardSource } from "akasha/alan/music/listening/heard-music/heard-source/heard-source.page-type.types.ts"

export const seedPriorWindow = {
  id: "01a0caa0-d3c5-7613-a483-24dce0a3674a",
  type: "page-type/heard-source",
  slug: "seed-prior-window",
  definition: "a track taken from what played before the first capture",
} as const satisfies HeardSource
