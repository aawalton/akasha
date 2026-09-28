import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00050 = {
  id: "01a0e5da-22bc-701a-a095-1208d77e2e33",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-050",
  cover: "image/image-293abe62037caf83",
  ownLength: 126,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 50,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/player",
  action:
    "I pick up the worm, take it back to the break room, and put it in the cooler with the others. As I walk back to my room, I think to Links, **Can we afford hot water now? I really need a hot shower**",
  beats: [
    "Nala crouches to lift the big worm; dried, it is a hard grey coil as wide as a cartwheel.",
    "It must weigh sixty pounds; she can't get it off the floor, but it tips onto its edge and rolls.",
    "She rolls it down the hall between the columns and into the break room.",
    "It is far too wide for the cooler, so she sets it beside it, where the room is dry.",
    "Heading to her quarters, she thinks at Links: can they afford hot water yet? She needs a shower.",
    "Links answers in her head: \"There's no shower. There's the tub.\"",
    '"Taps run hot once I reach fifty. Till then I can heat you one tubful, for a point of power."',
  ],
  lore: ["place/otherwhere-hall-back", "place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
} as const satisfies StoryTurnPlayed
