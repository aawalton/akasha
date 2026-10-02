import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00075 = {
  id: "01a0fd88-0594-7500-bf01-b5f55ea54120",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-075",
  cover: "image/image-2d25e854b7871a67",
  coverAfter: "Behind your boulders you hold two water lenses in the air, one",
  ownLength: 123,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 75,
  prose: "txt",
  characters: [
    "character-player/overwhere-i-nala",
    "character-other/overwhere-i-quarry-crewman-four",
  ],
  stepStatus: "step-status/player",
  action: "I use my lens working to find the crossbowman in the trees, then snipe him out",
  beats: [
    "Behind her boulders Nala holds two water lenses in air as her spyglass and sweeps the treeline.",
    "The sweep takes about a minute; nothing in the pines moves or looses.",
    "She finds the shooter's stand: trampled needles, a dropped bolt, and scuffed needles leading north.",
    "The shooter is gone.",
    "She turns the lens on the pit; the gallery mouths are dark and still.",
    "The fallen crossbowman lies on his face in a gallery mouth, his crossbow under him, dead.",
    "On the pit's north wall the lens finds a goat path climbing to the forest.",
    "Its dust is freshly scuffed.",
  ],
  issues: [
    '"bends air into a lens" - her lens is water held in air; the spyglass is two water lenses',
  ],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-the-deserter-crew-2",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-03T15:10:00.000Z",
} as const satisfies StoryTurnPlayed
