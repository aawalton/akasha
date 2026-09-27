import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00024 = {
  id: "01a0e4ee-6e2d-77eb-94b3-6db9d4865ef6",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-024",
  cover: "image/image-5b1970dbb02b0aee",
  ownLength: 181,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 24,
  prose: "txt",
  characters: [
    "character-player/otherwhere-alan",
    "character-other/otherwhere-engorged-bookworm-03",
    "character-other/otherwhere-engorged-bookworm-04",
  ],
  turnStatus: "turn-status/player",
  action:
    "I hold down the first worm with a knee, grab two more handfuls of salt, then wait for the second worm to lunge, grabbing it by the neck as well",
  beats: [
    "Nala plants a knee on the pinned bookworm, holding it against the salt line.",
    "She scoops two more fistfuls of salt from the gap's edge, and the gap spreads wider.",
    "Under her knee the bookworm gives a last shudder and dries into a hard grey coil, alive and still.",
    "The bookworm that chewed the broom pours through the widened gap and lunges at her.",
    "Its teeth sink into her left forearm before her hands can close, deep and tearing.",
    "She clamps both salted fists round its neck behind the mouth and wrenches it off her arm.",
    "Its skin puckers and hisses under the salt; it thrashes, weaker now, but still strong in her grip.",
    "Blood runs down her left arm and drips onto the salt, and the arm is going numb and shaky.",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/picture", "story-recorder/memory"],
} as const satisfies StoryTurnPlayed
