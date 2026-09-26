import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerWornBrigandine = {
  id: "01a0cb5c-79c7-7bdd-9a3e-ea4dad54d034",
  type: "page-type/story-item",
  slug: "the-tower-worn-brigandine",
  title: "Worn brigandine",
  story: "story-played/the-tower",
  character: "character-other/the-tower-companion-aelwyn",
  slot: "item-slot/chest",
  description: "A brigandine of small plates riveted inside a cloth body, worn but sound.",
} as const satisfies StoryItem
