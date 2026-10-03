import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveEventHannahsFuneral = {
  id: "01a0e9fc-7b32-7ce1-8e4c-6edba0a8079a",
  type: "page-type/lore",
  slug: "super-supportive-event-hannahs-funeral",
  title: "Hannah Elber's funeral",
  world: "world/super-supportive",
  facts: [
    {
      fact: "The funeral is held on Anesidora Island.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
