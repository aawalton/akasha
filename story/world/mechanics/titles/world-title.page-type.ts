import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldTitle = {
  id: "01a06558-a991-7a45-b681-fed7723c95e3",
  type: "page-type/page-type",
  slug: "world-title",
  definition: "a name the world gives a character for something they did",
  pluralSlug: "titles",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  parts: ["page-type/character-title"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-10-27T19:02:30.081Z",
} as const satisfies PageType
