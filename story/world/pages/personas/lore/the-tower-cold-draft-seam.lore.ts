import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerColdDraftSeam = {
  id: "01a0d445-cacb-7817-86dc-61ad1f0fb8b7",
  type: "page-type/lore",
  slug: "the-tower-cold-draft-seam",
  title: "The Cold Draft Seam",
  world: "world/personas",
  about: "item/the-tower-cold-draft-seam",
  loreDisclosure: "lore-disclosure/game-master",
  facts: ["The Long Gallery's cold draft seam comes from the real den behind the illusion."],
} as const satisfies Lore
