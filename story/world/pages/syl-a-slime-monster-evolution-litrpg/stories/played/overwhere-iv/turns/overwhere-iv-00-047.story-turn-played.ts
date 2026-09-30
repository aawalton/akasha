import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00047 = {
  id: "01a0f49b-751a-7ff2-b5db-722b14f00242",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-047",
  cover: "image/image-a7d6e2c85256192e",
  ownLength: 195,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 47,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/recorders",
  action:
    "“I’ve been working on a specialized armor piercing spear skill for a long time and I guess it’s finally paying off. Practicing pushing past armor turned out to be just what I needed to learn to strike from a distance. Useless without a spear though.”",
  beats: [
    '"I\'ve been working on an armor-piercing spear skill for a long time," Nala says. "It\'s paying off."',
    '"Practicing pushing past armor turned out to be what I needed to strike from a distance."',
    '"Useless without a spear, though."',
    'Marta drinks it in, nodding. "A spear trick. Well, I never." Her eyes are bright with the tale.',
    'Her face softens. "My boy went into that Tangle. Wolves, they said. Never came out."',
    "She presses Nala's three copper back into her palm. \"A goblin-killer's first meal is on the house.\"",
    "Nala finishes her pottage and crosses the square to the shrine.",
    "One whitewashed room, cool and dim, benches and an altar. Behind the altar, seven chained books.",
    "An old woman sits mending on a bench, stout and grey, with sharp eyes. She looks Nala over.",
    '"Sister Anwen," she says slowly. "You\'ll be wanting the books. A copper in the poor box, then."',
    '"Two of scripture, a herbal, a vale chronicle, a primer, a road book, and the hero tales."',
    'She takes a key from her belt. "Which will you sit with, child?"',
  ],
  issues: [
    '"She takes a key from her belt and waits." - No Prompt',
    '"She takes a key from her belt and waits." - Leave It Open',
  ],
  lore: ["lore/overwhere-iv-marta-hesk", "lore/overwhere-iv-nala", "lore/overwhere-iv-nala-2"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/inventory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-10-02T12:16:00.000Z",
} as const satisfies StoryTurnPlayed
