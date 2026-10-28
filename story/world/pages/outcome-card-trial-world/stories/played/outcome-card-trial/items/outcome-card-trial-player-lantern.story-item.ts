import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const outcomeCardTrialPlayerLantern = {
  id: "01a183ae-dc71-7f55-8b1f-27afdf55f9a7",
  type: "page-type/story-item",
  slug: "outcome-card-trial-player-lantern",
  title: "Lantern",
  world: "world/outcome-card-trial-world",
  story: "story-played/outcome-card-trial",
  character: "character-player/outcome-card-trial-player",
  category: "tool",
  description: "A tin lantern with a glass window and a wire handle.",
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies StoryItem
