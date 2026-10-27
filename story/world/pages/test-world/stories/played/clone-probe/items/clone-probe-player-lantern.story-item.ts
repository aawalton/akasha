import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const cloneProbePlayerLantern = {
  id: "01a17f4c-d936-78bd-a367-6718088d5c49",
  type: "page-type/story-item",
  slug: "clone-probe-player-lantern",
  title: "Lantern",
  world: "world/test-world",
  story: "story-played/clone-probe",
  character: "character-player/clone-probe-player",
  category: "tool",
  description: "A tin lantern with a glass window and a wire handle.",
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies StoryItem
