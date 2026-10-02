import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00091 = {
  id: "01a0fe9b-d05a-7af1-a75c-0b62e0d10e8e",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-091",
  ownLength: 143,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 91,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala", "character-other/overwhere-i-harl-voss"],
  stepStatus: "step-status/recorders",
  action:
    "“Sure, got makes sense to preserve this head and the ears. I’ll take the salt for that.”",
  beats: [
    '"Sure, makes sense to preserve this head and the ears. I\'ll take the salt for that," Nala says.',
    "She pays Osric 4 copper, and he hauls a sack of coarse salt down from the cart.",
    "One sack is enough; she packs Voss's head and the eight ears in salt inside Voss's own sack.",
    "It takes a quarter hour by her palm flame and the embers, Tobin looking anywhere else.",
    '"Three weeks that\'ll keep," Osric says, and then counts 5 silver into her palm.',
    '"For the road. The east carts owe you, every one of them, and I\'ll say so in Wendlow."',
    "He rubs the back of his neck, sheepish, and glances at the sack of coin.",
    '"Only... the silver toll Voss took off me at the quarry. One silver. Might I have it back?"',
  ],
  issues: [
    '"Tobin holding the flame" - the flame is Nala\'s palm working; Tobin, a bowman, has no magic',
  ],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-osric-fenn",
    "lore/overwhere-i-the-deserter-crew-2",
    "lore/overwhere-i-the-deserter-crew-2-2",
    "lore/overwhere-i-the-deserter-crew-2-2-2",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  endsAt: "2026-10-04T00:55:00.000Z",
} as const satisfies StoryTurnPlayed
