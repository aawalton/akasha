import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00070 = {
  id: "01a0e930-9268-7437-8b3f-8e03e2500a0c",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-070",
  ownLength: 202,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 70,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/game-master",
  action:
    "**Okay, let the work, I'd like you to identify books we've found that I should read to prepare for the opening**",
  beats: [
    "Nala asks Links which books found so far she should read to be ready for the opening.",
    "Links pauses, eyes flickering blue, searching every shelved book by what it teaches.",
    "Links: first and most needed, Counter Keeping, a working text of the Library's own magic.",
    "Links: it teaches the Counter's lending; without its power the Counter lends no book.",
    "Links: Nala shelved it herself yesterday, from the heaps by the columns, low near the Counter.",
    "Links: Counter Keeping is some three hours of quiet reading.",
    "Links: second, Courtesies of the Many Peoples, a thick plain guide to patrons' customs, no power.",
    "Links: the whole takes days; its first part, on the commonest peoples, takes an afternoon.",
    "Links: a golem shelved Courtesies this morning, high up on the west gallery.",
    "Links: no book shelved in the hall yet teaches healing.",
    "Links: so for now a patron who comes in hurt gets food and shelter, nothing more.",
    "Behind her, the two shelvers keep up their slow stooping, lifting and reaching.",
    "Counter Keeping is a few steps from the Counter; Courtesies is high on the west gallery.",
  ],
  issues: ['"Counter Keeping sits on its low shelf a few steps from the Counter." - Leave It Open'],
  lore: ["place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
