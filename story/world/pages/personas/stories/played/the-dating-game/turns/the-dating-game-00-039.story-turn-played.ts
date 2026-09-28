import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00039 = {
  id: "01a0e59b-5001-754e-9cf5-132d763fb236",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-039",
  ownLength: 116,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 39,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  turnStatus: "turn-status/reviewers",
  action: "“Good night, Grace.” I watch her go, then head home and go to sleep.",
  beats: [
    'Alan: "Good night, Grace."',
    "She smiles back over her shoulder and turns toward the far gate.",
    "He watches her lantern move off between the dark rows of stones, small and gold under the pines.",
    "It passes through the gate and out of sight, and the cemetery is left to the evening.",
    "He walks home up the hill, the air cooling, the streetlights on along Apple Avenue.",
    "His house is quiet: one mug in the drying rack, one coat on the hook.",
    "He kicks off the dusty Ecco slip-ons by the door, as he did last night.",
    "He goes to bed, and the long day lets go of him; sleep comes easily.",
  ],
  reviewedBy: ["story-reviewer/style"],
} as const satisfies StoryTurnPlayed
