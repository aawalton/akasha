import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereJungleTownRefugees = {
  id: "01a0e9cb-9157-780a-9922-0224b75a5bd0",
  type: "page-type/lore",
  slug: "otherwhere-jungle-town-refugees",
  title: "Abby, Walter and the Jungle Refugees",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Many people who skip the later trials return home with only a few levels.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
