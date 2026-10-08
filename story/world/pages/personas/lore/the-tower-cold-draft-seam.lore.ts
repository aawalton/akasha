import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerColdDraftSeam = {
  id: "01a0d445-cacb-7817-86dc-61ad1f0fb8b7",
  type: "page-type/lore",
  slug: "the-tower-cold-draft-seam",
  title: "The Cold Draft Seam",
  world: "world/personas",
  about: "story-item/the-tower-cold-draft-seam",
  facts: [
    {
      fact: "The Long Gallery's cold draft seam comes from the real den behind the illusion.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-24T16:35:38.827Z",
  updatedAt: "2026-09-26T18:13:39.000Z",
} as const satisfies Lore
