import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00057 = {
  id: "01a0f475-c4e2-7708-b8fa-8bf58487f13b",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-057",
  ownLength: 141,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 57,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala", "character-other/overwhere-i-ghost-eye"],
  stepStatus: "step-status/recorders",
  action:
    "“Yep! Mission complete! Didn’t get the whole pack, but I took out Ghost-Eye along with all the highest level ones. Want to see the eye?”",
  beats: [
    "Rowan goes quite still, staring at her.",
    "Then he laughs, a startled bark of a laugh, and scrubs a sooty hand over his face.",
    '"Y-yes. Show me."',
    "Nala fishes the milky eye out of her pack and holds it out on her palm.",
    "Sedge flattens its crest and backs off, growling low in its throat.",
    'Rowan bends close without touching it. "A d-drake-pearl. An old alpha\'s eye goes to that."',
    '"Grown of mana. Alchemists in Wendlow pay several gold for one."',
    'He straightens, and his face turns earnest. "B-but the Hall pays on the head. Only the head."',
    '"Where did you leave it? The fen scavengers will have the body inside two days."',
  ],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-rowan-coalby",
    "lore/overwhere-i-the-greyfen-alpha-2",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/inventory", "story-recorder/memory"],
  endsAt: "2026-10-01T16:33:00.000Z",
} as const satisfies StoryTurnPlayed
