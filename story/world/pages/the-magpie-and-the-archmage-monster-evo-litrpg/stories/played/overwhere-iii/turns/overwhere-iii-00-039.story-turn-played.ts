import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00039 = {
  id: "01a0f3eb-6291-73ca-8e92-4a97c46c5816",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-039",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 39,
  stepStatus: "step-status/writer",
  action:
    "“Are there any books in town? I’d like to spend the afternoon learning, and I’d hate to pester people with questions if I don’t need to.”",
  beats: [
    '"Are there any books in town?" Nala asks.',
    "\"I'd like to spend the afternoon learning, and I'd hate to pester people with questions.\"",
    'Marda snorts. "Books are dear up here." She reaches behind the desk and sets two on it.',
    "A fat, scuffed one: a guide to Wrenmark beasts, by level, weak spots, bounties, what parts sell.",
    "A thinner one: the Guild's book of rules. Ranks, quest terms, the bounty table, what a ring does.",
    '"Read them at the side bench as long as you like. They don\'t leave the post."',
    '"Past these, the Hearth chapel at the top of the square keeps a herbal and a primer."',
    '"Old Sister Wenna lends them to anyone who\'ll sit and read them there."',
  ],
  lore: ["place/overwhere-iii-merrowgate", "place/overwhere-iii-merrowgate-guild-post"],
  endsAt: "2026-10-01T12:27:00.000Z",
} as const satisfies StoryTurnPlayed
