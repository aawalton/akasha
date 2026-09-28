import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereI00070 = {
  id: "01a0e930-9268-7437-8b3f-8e03e2500a0c",
  type: "page-type/story-turn-played",
  slug: "otherwhere-i-00-070",
  cover: "image/image-2e4d7972995b6b40",
  ownLength: 170,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-i"],
  position: 70,
  prose: "txt",
  characters: ["character-player/otherwhere-i-alan", "character-other/otherwhere-i-links"],
  stepStatus: "step-status/player",
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
  ],
  lore: ["place/otherwhere-i-main-hall"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-29T06:39:00.000Z",
} as const satisfies StoryTurnPlayed
