import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvCrystalHill = {
  id: "01a0ea0e-ec0c-7776-b6cd-d86eb226d170",
  type: "page-type/place",
  slug: "otherwhere-iv-crystal-hill",
  title: "Crystal Hill",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-azure-hills",
  facts: [
    {
      fact: "Crystal Hill is home to a monkey Spirit Beast clan skilled at transformation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Crystal Hill Monkeys are golden snub-nosed monkeys who mine spirit crystals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Master Gen Ten, an elder monkey, leads Crystal Hill's clan.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gen Ten has publicly allied his clan with the sects of the Azure Hills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nearly fifty Crystal Hill Monkeys have come to full sapience after recovering their past.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Integrating the monkeys among cultivators went slowly, with early insults and unease.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gen Ten hosted a dinner, inviting Jin, to thank all who helped the monkeys.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Huo Ten is the Crystal Hill Monkeys' ambassador to the Azure Hills sects.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Huo Ten is a snake Spirit Beast with a hissing lisp; Liang Yin calls him Shifu.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Huo Ten dug tunnels at Fa Ram, later made a cold cellar; he loves digging.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
