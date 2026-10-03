import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00086 = {
  id: "01a10170-9a9a-7fa6-940b-f567a4ab283d",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-086",
  ownLength: 143,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 86,
  prose: "txt",
  characters: [
    "character-player/overwhere-iv-nala",
    "character-other/overwhere-iv-ilsa-crane",
    "character-other/overwhere-iv-rennick-hale",
    "character-other/overwhere-iv-brenna-holt",
  ],
  stepStatus: "step-status/reviewers",
  action:
    "“I’ll get some sleep, then go scoring again.” Before going to sleep, I go and resign from the guard, thanking them and paying them for the gear, asking if I can keep what I had been using, then sleep and back out to the woods where I ambushed the goblins.",
  beats: [
    '"I\'ll get some sleep, then go scoring again," Nala tells Ilsa.',
    "She walks up the street to the gatehouse and finds Hale over his ledger.",
    "She tells him she's leaving the watch, and thanks him, and offers to pay for the gear she's using.",
    '"Can I keep what I\'ve been wearing?"',
    "Hale has heard about the strike already. He looks her over a long moment.",
    '"Keep the boots, the tunic and the jerkin. No coin. You\'ve earned them."',
    '"And you\'ve a full week on the roll." He counts five silver onto the ledger. "Your wage."',
    "He strikes her name from the watch roll with one clean line.",
    'In the yard, Holt nods to her. "Gate yard\'s open at dawn if you want to drill. Any day."',
    'Hale closes the ledger. "The bunks are for the watch, mind. You\'ll want a bed elsewhere."',
  ],
  lore: [
    "lore/overwhere-iv-ilsa-crane-2",
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
    "lore/overwhere-iv-the-tangle-2",
    "place/overwhere-iv-millbrook-gatehouse",
  ],
  endsAt: "2026-10-07T07:40:00.000Z",
} as const satisfies StoryTurnPlayed
