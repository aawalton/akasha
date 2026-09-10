import type { PageType } from "@akasha/pages/page-type"

export const worldQuest = {
  id: "01a06558-a991-7cfc-a470-1adaf50096f8",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-quest",
  definition: "a piece of work the world sets a character",
  pluralSlug: "world-quests",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
} as const satisfies PageType
