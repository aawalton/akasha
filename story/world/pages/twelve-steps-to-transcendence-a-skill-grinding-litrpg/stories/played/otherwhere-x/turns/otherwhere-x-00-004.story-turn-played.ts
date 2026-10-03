import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereX00004 = {
  id: "01a0ea9b-820c-7ee2-b79f-835ff0fc70f0",
  type: "page-type/story-turn-played",
  slug: "otherwhere-x-00-004",
  cover: "image/image-43006ec8cd75c05d",
  coverAfter: "Behind you, across the green, doors are opening. Faces show in them,",
  ownLength: 218,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-x"],
  position: 4,
  prose: "txt",
  characters: ["character-player/otherwhere-x-nala"],
  stepStatus: "step-status/player",
  action:
    "\"I'm Nala. I think my home is far away from here, but I'm not sure where here is precisely, so I couldn't tell you how far. As for business, I suppose I'm looking for a warm meal and roof to sleep under for the night. I could sing for my support or tell stories if you'd like. I have a feeling I have many you'll have never heard the likes of before.\"",
  beats: "jsonl",
  lore: ["place/otherwhere-x-harrow"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-28T18:31:00.000Z",
} as const satisfies StoryTurnPlayed
