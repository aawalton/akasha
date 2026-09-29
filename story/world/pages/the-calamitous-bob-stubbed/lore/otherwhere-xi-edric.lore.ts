import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEdric = {
  id: "01a0ea7f-d848-7c83-9c7f-1d2f41cdd699",
  type: "page-type/lore",
  slug: "otherwhere-xi-edric",
  title: "Edric",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-edric",
  facts: [
    {
      fact: "Edric, called Ed, was a thief boss in Kazar when refugees crowded the town.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Edric's gang was killed breaking into Kazar's town hall, a crime punished by death.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Edric was hung from Kazar's Lilac tree with some ten severed hands; Edric is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Before he died Edric named his associate Karel.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
