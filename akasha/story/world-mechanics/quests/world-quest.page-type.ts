import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../mechanics/world-mechanic.page-type.ts"

export type WorldQuest = WorldMechanic

export const worldQuest = {
  id: "01a06558-a991-7cfc-a470-1adaf50096f8",
  pageTypeSlug: "page-type",
  slug: "world-quest",
  definition: "a piece of work the world sets a character",
  pluralSlug: "world-quests",
  extendsSlug: "page-type/world-mechanic",
  runsTabooCheck: false,
} as const satisfies PageType
