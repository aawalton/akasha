import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00034 = {
  id: "01a0e535-e056-74fe-b93d-a82731bf95e9",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-034",
  ownLength: 113,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 34,
  prose: "txt",
  characters: ["character-player/otherwhere-alan"],
  turnStatus: "turn-status/recorders",
  action: "I go back down to the core and put my hands in the same places as before.",
  beats: [
    "Nala goes back down the spiral stair into the round chamber, under its dim blue-green glow.",
    "This time the walk to the trunk is an ordinary walk; it comes closer with every step.",
    "She lays both palms on the two knots of light, a shoulder's width apart, as before.",
    "Burning pours up her arms and through her veins, and the chamber falls away.",
    "She sees the Library's own halls: a kitchen stirring awake, wings sealed shut, branches gone dark.",
    "The burn fades and the chamber comes back; she is still standing, and nothing is drained this time.",
    "A window opens: Synchronization Complete.",
  ],
  lore: ["place/otherwhere-core-chamber"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory"],
} as const satisfies StoryTurnPlayed
