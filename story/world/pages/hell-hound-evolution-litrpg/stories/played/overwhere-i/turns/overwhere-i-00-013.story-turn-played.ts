import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00013 = {
  id: "01a0f19d-6c1e-7bbc-a22d-3ccc9e12a600",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-013",
  ownLength: 173,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 13,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/recorders",
  action:
    "“Ooh, those both sound fun! Maybe I’ll try one of them tomorrow. How far to Fenwatch? I’d like to pick up that reward for some pocket money. I always seem to run out so fast, though it’s never hard to get more.”",
  beats: [
    '"Ooh, those both sound fun! Maybe I\'ll try one of them tomorrow," Nala says.',
    '"How far to Fenwatch? I\'d like to pick up that reward for some pocket money."',
    '"I always seem to run out so fast, though it\'s never hard to get more."',
    "Hessa's knife stops. She looks at Nala a long moment: the bare feet, the shirt, the easy smile.",
    '"An hour\'s walk. East, over the ridge, down to the gate." She goes back to the joint.',
    '"The reeve pays the bounty. Agathe Morrow. She\'ll pay it on my word that the kill was yours."',
    "\"Tobin'll be back with a cart early afternoon. Wait, and walk in with it. I'll vouch for you.\"",
    "She works the knife round the joint in silence for a moment.",
    "\"And 'tomorrow' for Ghost-Eye or Voss is how people end up in the fen for the eels.\"",
    "\"Money's easy come where you're from, maybe. Here it's not. Nor second chances.\"",
    "She sets the second foreleg down beside the first, and starts on a hind leg.",
  ],
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-hessa-vane",
    "lore/overwhere-i-nala",
    "lore/overwhere-i-sootjaw",
    "place/overwhere-i-fenwatch",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-29T11:28:00.000Z",
} as const satisfies StoryTurnPlayed
