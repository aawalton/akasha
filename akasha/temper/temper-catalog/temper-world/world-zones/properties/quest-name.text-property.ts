import type { TextProperty } from "@akasha/pages-system/text-property"

export type QuestName = string

export const questName = {
  id: "01a06167-3f9b-7005-8239-5f6804becb87",
  pageTypeSlug: "text-property",
  slug: "quest-name",
  propertySlug: "quest-name",
  definition: "the name a quest is shown under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
