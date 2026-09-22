import type { HeardSource } from "akasha/alan/music/listening/heard-music/heard-source/heard-source.page-type.types.ts"

export const observed = {
  id: "01a0caa0-c4bb-7537-b031-3ae9eaf0d7b3",
  type: "page-type/heard-source",
  slug: "observed",
  definition: "a track caught playing",
} as const satisfies HeardSource
