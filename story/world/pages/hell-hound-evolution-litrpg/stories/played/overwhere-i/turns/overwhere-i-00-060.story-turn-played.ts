import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00060 = {
  id: "01a0f493-58d5-736b-9219-6417774611e4",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-060",
  ownLength: 109,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 60,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/reviewers",
  action:
    "“I’ll pay you two silver now for information on what a drake-pearl is good for. Is it something I could use?”",
  beats: [
    "Nala sets two silver down and asks Osric what a drake-pearl is good for, and if she could use it.",
    "Osric grins, sweeps the coins into his coat, and says he never turns away coin for talk.",
    "He says the Wendlow alchemists grind drake-pearls into night-sight draughts.",
    "He says a mage can drain one like a fat mana crystal, and calls that burning gold.",
    "Nala's purse is lighter by two silver.",
    "Osric keeps the alchemists' price behind a smile, and leans in over his hat.",
    '"Two gold and five silver, then, and it\'s off your hands tonight," he says.',
  ],
  lore: [
    "lore/overwhere-i-greyfen-beasts-2",
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-osric-fenn",
  ],
  reviewedBy: ["story-reviewer/continuity"],
  endsAt: "2026-10-01T18:00:00.000Z",
} as const satisfies StoryTurnPlayed
