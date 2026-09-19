import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldSong = {
  id: "01a06558-a991-7a9a-ae0f-69b9a7858eb3",
  type: "page-type/page-type",
  slug: "world-song",
  definition: "an ability a character works by singing",
  pluralSlug: "songs",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
