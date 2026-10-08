import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldQuest = {
  id: "01a06558-a991-7cfc-a470-1adaf50096f8",
  type: "page-type/page-type",
  slug: "world-quest",
  definition: "a piece of work the world sets a character",
  pluralSlug: "quests",
  extends: ["page-type/world-mechanic"],
  parts: ["page-type/harem-hotel-floor", "page-type/climb-floor"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-10-01T21:17:02.000Z",
} as const satisfies PageType
