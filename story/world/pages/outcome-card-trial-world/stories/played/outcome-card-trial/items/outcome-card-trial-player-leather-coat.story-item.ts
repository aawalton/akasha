import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const outcomeCardTrialPlayerLeatherCoat = {
  id: "01a183ae-dc71-7f45-b38f-6e7bef35f71a",
  type: "page-type/story-item",
  slug: "outcome-card-trial-player-leather-coat",
  title: "Leather Coat",
  world: "world/outcome-card-trial-world",
  story: "story-played/outcome-card-trial",
  character: "character-player/outcome-card-trial-player",
  slot: "item-slot/chest",
  category: "armor",
  description: "A brown leather coat, long enough to cover the knees.",
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies StoryItem
