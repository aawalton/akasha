import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvHuian = {
  id: "01a0ea11-109e-736e-affb-0fb9ad355145",
  type: "page-type/lore",
  slug: "otherwhere-iv-huian",
  title: "Huian",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "Huian is an androgynous Heavenly Demon, an agent of Yulong who commands funerary-tablet spirits.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Huian commands puppets and Artificial Demons, possessing a pawn's eyes to see and give orders.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Huian can spend years of their own lifespan to force souls into Rong, briefly reaching Sky Realm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Huian barely escaped Fa Ram last winter, wounded and chased by animated snowmen and hunters.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
