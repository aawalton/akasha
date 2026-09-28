import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIii00007 = {
  id: "01a0ea1d-d0e4-74bf-a865-72128ee4cbfe",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iii-00-007",
  ownLength: 169,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iii"],
  position: 7,
  prose: "txt",
  characters: [
    "character-player/otherwhere-iii-nala",
    "character-other/otherwhere-iii-denise-pruitt",
  ],
  stepStatus: "step-status/recorders",
  action:
    '"Nala Arthur, January 22, 1986, 1350 Apple Ave Provo, Utah" I recite smoothly. "No local address"',
  beats: [
    'Nala recites it smoothly: "Nala Arthur. January 22, 1986. 1350 Apple Ave, Provo, Utah."',
    '"No local address."',
    "Behind her, Denise lifts a hand in a small wave and pushes through a door marked STAFF ONLY.",
    "Marcus types as Nala talks, two fingers, quick and steady: the name, the street, the city.",
    "At the birth date his fingers stop on the keys.",
    "He looks up at her face, freckled and young, for a long, mild moment.",
    '"Eighty-six?" he says, easy, with no edge in it. "Hon, that\'d make you fifty-one."',
    '"Say the birth date for me one more time?"',
  ],
  lore: ["place/otherwhere-iii-uptown-memorial-er", "lore/otherwhere-iii-nala"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2037-01-31T05:08:00.000Z",
} as const satisfies StoryTurnPlayed
