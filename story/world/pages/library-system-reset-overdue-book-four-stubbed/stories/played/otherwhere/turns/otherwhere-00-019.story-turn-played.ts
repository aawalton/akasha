import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00019 = {
  id: "01a0e4b0-2e6e-72b6-897d-300db085851b",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-019",
  ownLength: 242,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 19,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/reviewers",
  action:
    "“Okay, that’s helpful. Plan B then.” I sweep the salt into a think circle around me, keeping the diameter only about three feet so I can keep it doubly thick, then start moving the circle down the center of the hall, baiting the small ones towards me.",
  beats: [
    '"Okay, that\'s helpful," she says. "Plan B, then."',
    "She tips out salt beside the box and sweeps it round herself with the broom into a tight ring.",
    "She keeps the ring only about three feet across, and sweeps the salt in doubly thick all round.",
    "It takes her a while; the bristles are worn short, and she goes over every thin spot twice.",
    "When she's done she stands in a thick white ring, and a little under half the box is left.",
    "Links watches from outside the ring, his head tilted, runes turning slowly.",
    '"True to my word, then," he says. "Two things."',
    '"Their lunge stops dead at a salt line. But a head can still stretch about a foot over it to bite."',
    '"And every time you push the ring along, the broom opens a gap in its edge for a moment."',
    "Her feet are only a foot and a half from the salt, she works out; a head over the line could reach.",
  ],
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
