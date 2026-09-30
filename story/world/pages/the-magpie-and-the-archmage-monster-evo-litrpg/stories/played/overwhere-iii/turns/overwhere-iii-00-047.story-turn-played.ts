import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00047 = {
  id: "01a0f49f-738e-74c2-8c61-f2b00a0851aa",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-047",
  cover: "image/image-9debf584f3346b05",
  ownLength: 150,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 47,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-brannagh-tull",
  ],
  stepStatus: "step-status/recorders",
  action:
    "“Does it give back more mana than it costs? If not, I don’t know that it would help me much quite yet.”",
  beats: [
    "Nala asks whether the draught gives back more mana than it costs to brew.",
    "If not, she says, she doesn't know it would help her much yet.",
    "Brannagh scratches the cat behind its one ear, thinking.",
    '"One jackalope\'s antlers, ground, make two draughts. Each fills a small store of mana."',
    '"Mother said a pot gives back about three times what you pour into it."',
    "\"And she poured at day's end, from what a night's sleep would fill anyway.\"",
    "\"I never had enough in me to try it. Whether it's a bargain for you, only you'll know.\"",
    "She pushes the loaf and cheese across the counter toward Nala.",
    '"If it\'s getting it back faster you want," she says, "Mother had a saying."',
    '"The old shrine at the crossroads gives back what a day took, to them as rest there."',
    '"Old wives\' talk, maybe. I never had the mana to test it."',
  ],
  issues: [
    '"What the pot takes out of you...I can\'t tell you" - Brannagh knows Mother said ~3x back',
  ],
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-brannagh-tull-2",
    "lore/overwhere-iii-magic",
    "lore/overwhere-iii-mother-sallow",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/inventory", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-10-03T13:25:00.000Z",
} as const satisfies StoryTurnPlayed
