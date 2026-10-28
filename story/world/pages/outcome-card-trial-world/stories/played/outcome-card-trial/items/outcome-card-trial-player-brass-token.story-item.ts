import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const outcomeCardTrialPlayerBrassToken = {
  id: "01a183ae-dc71-70cf-b818-b1ef2cf1dc32",
  type: "page-type/story-item",
  slug: "outcome-card-trial-player-brass-token",
  title: "Brass Token",
  world: "world/outcome-card-trial-world",
  story: "story-played/outcome-card-trial",
  character: "character-player/outcome-card-trial-player",
  quantity: 2,
  description: "A round brass token stamped with a star.",
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies StoryItem
