import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type QuestGiver = string

export const questGiver = {
  id: "01a05fc4-7a93-7960-9695-186bd5fc0248",
  pageTypeSlug: "relation-property",
  slug: "quest-giver",
  propertySlug: "quest-giver",
  definition: "the character handing out a dungeon's pledge",
  targetPageTypeSlug: "page-type/temper-quest-giver",
} as const satisfies RelationProperty
