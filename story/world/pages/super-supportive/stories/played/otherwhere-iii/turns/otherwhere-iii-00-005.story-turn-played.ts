import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIii00005 = {
  id: "01a0ea0b-fb0b-7ace-a141-8f881a1ac7a2",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iii-00-005",
  ownLength: 220,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iii"],
  position: 5,
  prose: "txt",
  characters: [
    "character-player/otherwhere-iii-nala",
    "character-other/otherwhere-iii-denise-pruitt",
  ],
  stepStatus: "step-status/recorders",
  action:
    "“Out West, small town in the mountains. Lots of nature but less in the way of opportunities.”",
  beats: [
    'Nala says, "Out West. Small town in the mountains."',
    '"Lots of nature, but less in the way of opportunities."',
    "Denise nods slowly and lets it lie.",
    '"Mountains. So you know cold. Just not in bare feet," she says, and one corner of her mouth lifts.',
    'The recorded voice says, "Wilson"; the doors open on snow and wind and chime shut again.',
    "In the socks, Nala's toes still throb, but the burn is easing into a deep, hot ache.",
    'Denise zips her lunch bag and tucks it under her arm as the voice says, "Lawrence is next."',
    "The train slows under the lights of Lawrence, and Denise stands and steps to the doors.",
    "The doors open on the cold; Denise holds one out with her arm and looks back at Nala.",
    '"This is us, honey. It\'s one block to the ER. You coming?"',
  ],
  lore: ["lore/otherwhere-iii-denise-pruitt", "place/otherwhere-iii-uptown-memorial-er"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics"],
  endsAt: "2037-01-31T05:01:00.000Z",
} as const satisfies StoryTurnPlayed
