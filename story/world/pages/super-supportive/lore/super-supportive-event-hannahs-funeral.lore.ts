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
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:47:13.074Z",
  updatedAt: "2026-10-27T19:29:08.137Z",
} as const satisfies Lore
