import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00032 = {
  id: "01a0f367-861c-70cb-af9e-37195d6ba31c",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-032",
  ownLength: 143,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 32,
  prose: "txt",
  characters: [
    "character-player/overwhere-i-nala",
    "character-other/overwhere-i-reedlurker-of-the-first-holt",
  ],
  stepStatus: "step-status/recorders",
  action:
    "I attune water and try to pull the water out of the creature itself to dehydrate it. If that doesn’t work, I attune air and fire and rapidly heat it up instead.",
  beats: [
    "Nala reaches for water and wills it to draw the water out of the reedlurker itself.",
    "Nothing answers. The water inside a living body is like a locked door; there is nothing to grip.",
    "A few seconds go. The reedlurker skids nearer the channel, claws scrabbling in the mud.",
    "She lets the water go and reaches for fire and wind, binding them: a hot, dry pull.",
    "She throws it at the beast as a blast of searing wind.",
    "It hits the reedlurker full on. Its wet hide hisses and steams, and it shrieks.",
    "The smell of scorched fur and hot mud rolls over the bank.",
    "It flattens, writhing, its hide blistered and smoking, its snapping slowed.",
    "It is still alive. It drags itself on, a yard from the water, leaving a smear across the mud.",
  ],
  lore: [
    "lore/overwhere-i-greyfen-beasts",
    "lore/overwhere-i-nala",
    "lore/overwhere-i-starfall-legacy",
    "place/overwhere-i-the-greyfen",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/inventory", "story-recorder/memory", "story-recorder/mechanics"],
  endsAt: "2026-09-30T10:52:00.000Z",
} as const satisfies StoryTurnPlayed
