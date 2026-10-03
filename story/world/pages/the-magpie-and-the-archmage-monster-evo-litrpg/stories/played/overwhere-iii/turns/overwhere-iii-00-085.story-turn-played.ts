import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00085 = {
  id: "01a0ff74-0d99-76cb-b9ad-8e79768b93ad",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-085",
  ownLength: 128,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 85,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-edda-crane",
    "character-other/overwhere-iii-mother-sallow",
    "character-other/overwhere-iii-marda-hesk",
  ],
  stepStatus: "step-status/game-master",
  action:
    "“Whose house was that and how long have you known them? There was a woman there who commanded the wolves, but she was corrupted. When I confronted her, her face changed.”",
  beats: [
    '"Whose house was that, and how long have you known them?"',
    '"There was a woman there who commanded the wolves, but she was corrupted."',
    '"When I confronted her, her face changed."',
    "Edda goes very still in her barrow.",
    '"Mother Sallow\'s. Two winters. She came to the empty hut by the brook and took up burning."',
    '"Said she kept two big dogs against the wolves. Never let a soul near that lean-to."',
    '"Sold little charcoal, and never lacked coin. I thought that odd." Her jaw works.',
    '"The winter after she came, I found the first blighted stumps by my kilns. Never put it together."',
    'She stares down the road toward the wood. "A false face. Gods."',
    '"I\'m telling Marda at the post myself," she says. "Tonight, before the bell."',
  ],
  issues: [
    '"Edda goes very still in her barrow." - turn 84 prose has her beside her barrow; this prose says by',
  ],
  lore: [
    "lore/overwhere-iii-edda-crane",
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-marda-hesk-2",
    "lore/overwhere-iii-mother-sallow",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-2-2",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  endsAt: "2026-10-08T16:40:00.000Z",
} as const satisfies StoryTurnPlayed
