import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerClimbersRemains = {
  id: "01a0d445-1b2f-73e4-b346-82f4232dfbae",
  type: "page-type/story-item",
  slug: "the-tower-climbers-remains",
  title: "A previous climber's remains",
  story: "story-played/the-tower",
  place: "place/the-tower-hall-of-welcome",
  description: "The remains of a previous climber, behind the couches.",
} as const satisfies StoryItem
