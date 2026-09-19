import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldQuest = {
  id: "01a06558-a991-7cfc-a470-1adaf50096f8",
  type: "page-type/page-type",
  slug: "world-quest",
  definition: "a piece of work the world sets a character",
  pluralSlug: "quests",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
