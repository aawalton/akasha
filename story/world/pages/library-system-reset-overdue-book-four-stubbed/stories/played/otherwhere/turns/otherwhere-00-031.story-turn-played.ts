import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00031 = {
  id: "01a0e51c-b07a-74c8-b5b4-7d4b3fbdd0ba",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-031",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 31,
  turnStatus: "turn-status/writer",
  action:
    "“Okay, Links. The small ones are done but we’re out of salt. How do we deal with the big one?”",
  beats: [
    "Under Nala's hands the last small bookworm shudders and dries into a hard grey coil.",
    "The hall's gold light brightens another shade.",
    "She rolls it beside the others and asks Links how they deal with the big one, now the salt's gone.",
    'Links pads over, eyes flickering blue. "Salt still burns it. It just ploughs through a line anyway."',
    '"And it\'s far too big to hold down in a heap, even if you had a heap."',
    "\"The kitchen stores sacks of salt. The kitchen's asleep until I've more power to wake it.\"",
    '"I can rake it with my claws, but every swipe costs power I\'ve barely got."',
    'He looks at her blood-dark sleeve. "And it bites a great deal harder than those did."',
  ],
  lore: ["place/otherwhere-hall-back", "lore/otherwhere-universe"],
} as const satisfies StoryTurnPlayed
