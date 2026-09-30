import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00035 = {
  id: "01a0f386-d49f-7597-abd5-22f5e4877b33",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-035",
  ownLength: 147,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 35,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/recorders",
  action:
    "“Sorry about that, you can call it even against the reedlurker. Any other traps I should avoid pulling before I try again?”",
  beats: [
    "Nala says she's sorry, and that he can call it even against the reedlurker.",
    "Jory looks at the dead lurker on the bank, and the red goes out of his face.",
    '"Even? One of those dead is worth a sight more to me than a basket of wicker."',
    "He waves a hand. \"Keep the skin, and the reeve's coin. It's them I want gone, not paying.\"",
    "She asks which traps to keep clear of before she tries again.",
    'He points along the bank. "Eight traps on sixty yards of this channel. Three of them still whole."',
    "\"Each one's tied to a peeled willow stake on the bank. White as bone, you'll not miss them.\"",
    "Nala looks along the bank: pale stakes here and there, the second slide forty yards up.",
    '"You pull anything by a white stake," Jory says, "it\'s eels, not lurker."',
  ],
  lore: ["lore/overwhere-i-nala", "place/overwhere-i-the-greyfen"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  endsAt: "2026-09-30T10:57:00.000Z",
} as const satisfies StoryTurnPlayed
