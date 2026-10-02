import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00007 = {
  id: "01a0ea8a-9a5c-774e-980c-a31905500d44",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-007",
  cover: "image/image-349d284a60f56ea9",
  coverAfter: "The wound is shallow. Blood runs from it, but the beast is",
  ownLength: 167,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 7,
  prose: "txt",
  characters: ["character-player/otherwhere-ix-nala"],
  stepStatus: "step-status/player",
  action:
    "\"Firrelia System, if you have a unique trait waiting for me, now is the time, otherwise you'll have lost your chance.\" I grab at the glass and try to stab it into the beast's throat.",
  beats: [
    '"Firrelia System, if you have a unique trait waiting for me, now is the time," Nala says.',
    '"Otherwise you\'ll have lost your chance."',
    "No blue box comes. The air in front of her stays empty.",
    "She grabs at the glass in her own forearm and pulls a quill sliver free, finger-long.",
    "She drives it down into the bare skin of the beast's throat, just below its locked jaw.",
    "It goes in, and the beast jerks and makes a thin, choked squeal through its teeth.",
    "The sliver bites into her own palm as she pushes, and her grip goes slick with both their blood.",
    "Then the brittle glass snaps, leaving a short stub standing in its throat and nothing in her fist.",
    "The wound is shallow; blood runs from it, but the beast is still breathing hard through its nose.",
    "Its jaws stay locked on her calf, and it twists again, harder, as if the pain has made it angry.",
  ],
  lore: ["lore/otherwhere-ix-shardback", "lore/otherwhere-ix-nala"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-28T15:38:00.000Z",
} as const satisfies StoryTurnPlayed
