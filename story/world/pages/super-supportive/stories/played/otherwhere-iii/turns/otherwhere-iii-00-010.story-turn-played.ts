import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIii00010 = {
  id: "01a0ea4b-630b-7b8e-8ea5-7c537a0967ab",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iii-00-010",
  cover: "image/image-4f3ad4d4cf0edd38",
  ownLength: 272,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iii"],
  position: 10,
  prose: "txt",
  characters: [
    "character-player/otherwhere-iii-nala",
    "character-other/otherwhere-iii-denise-pruitt",
  ],
  stepStatus: "step-status/player",
  action:
    "\"Thank you, but I'm on my own for now. Yesterday I would have had you call my boyfriend, but that ship has sunk. Thank you for your kindness, you've really been a lifesaver today.\"",
  beats: [
    'Nala says, "Thank you, but I\'m on my own for now."',
    '"Yesterday I would have had you call my boyfriend, but that ship has sunk."',
    '"Thank you for your kindness. You\'ve really been a lifesaver today."',
    "Denise nods once and lets the phone go; she asks no second time.",
    "She tears a paper towel from the dispenser by the water fountain and writes on it in pen.",
    "She folds it into Nala's hand: a name, DENISE, and a phone number.",
    '"You need anything, you call that. Doesn\'t matter the hour."',
    '"Our social worker comes on at eight. I\'ll have Marcus send her straight to you."',
    "\"She's good. Beds, clothes, the works. And my break's around nine, so I'll come see you.\"",
    "On her way back she leans in at the triage window and says something low to Marcus; he nods.",
    "Denise lifts a hand to Nala and goes through the STAFF ONLY door; it swings shut behind her.",
    "The wall clock reads 5:29. Beside Nala sit the clogs and the fleece; the paper towel is in her fist.",
  ],
  issues: [
    '"Eight o\'clock is two and a half hours off. Beside you the sleeping man snores." - Leave It Open',
  ],
  lore: ["lore/otherwhere-iii-denise-pruitt"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2037-01-31T05:29:00.000Z",
} as const satisfies StoryTurnPlayed
