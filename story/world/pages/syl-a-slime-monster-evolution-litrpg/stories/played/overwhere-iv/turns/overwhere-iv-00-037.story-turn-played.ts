import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00037 = {
  id: "01a0f42a-91ed-7671-a295-5238d1e94225",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-037",
  cover: "image/image-2d0d2fdbf5a11c82",
  ownLength: 147,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 37,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-ilsa-crane"],
  stepStatus: "step-status/player",
  action:
    "“Yes, I didn’t see a way for us to finish the goblins without risking casualties without it. Is that going to be a problem? I chose Spellblade for my starting class.”",
  beats: [
    '"Yes," Nala says. "I didn\'t see a way to finish the goblins without someone getting hurt."',
    '"Is that going to be a problem? I chose Spellblade for my starting class."',
    "Ilsa's brows go up. \"Spellblade? I've never heard of anyone starting as one.\"",
    '"Most begin Mage or Warrior. Folk look down on Spellblades, you know. A half-and-half class."',
    '"But no. Not a problem here. I\'ll write you in the ledger as Spellblade, and nothing more."',
    "She taps the drawer under the counter. \"My report goes east on Garrett's cart at dawn. It's soft.\"",
    '"The trouble is talk. Carters drink and talk, and a black line is a good story."',
    '"If Aubrin hears that, I can\'t hide you with any report I write."',
    'She leans in. "So keep that line out of sight in town. Use it only out in the Tangle. Can you?"',
  ],
  issues: [
    '"no report of mine will hide it" - Nobody Acts',
    '"I\'ve never heard of it." - Ilsa knows Spellblade; lore says she never heard of one starting as it',
  ],
  lore: ["lore/overwhere-iv-ilsa-crane", "lore/overwhere-iv-nala", "lore/overwhere-iv-nala-2"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-01T15:51:00.000Z",
} as const satisfies StoryTurnPlayed
