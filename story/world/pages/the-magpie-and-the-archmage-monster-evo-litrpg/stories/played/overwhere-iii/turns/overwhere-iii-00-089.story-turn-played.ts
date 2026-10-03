import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00089 = {
  id: "01a10184-cbb1-794d-895e-b1aada24122a",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-089",
  cover: "image/image-e84c055128cbd290",
  ownLength: 202,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 89,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-brannagh-tull",
    "character-other/overwhere-iii-edda-crane",
  ],
  stepStatus: "step-status/player",
  action:
    "I sleep then decide to go hunting towards the blight. After facing those wolves, being weak is far more of a threat to me than going into danger. I stop by Brannagh’s first to check for patients to practice my mending weave on, then rest a while to refill my mana, the go out into the forest.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-brannagh-tull-2",
    "lore/overwhere-iii-corruption-2",
    "lore/overwhere-iii-edda-crane",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-09T11:40:00.000Z",
  coverAfter: "They spread out low around you, one on each side and one ahead.",
} as const satisfies StoryTurnPlayed
