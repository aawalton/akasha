import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVWolfman = {
  id: "01a0e9f3-7323-7056-86f3-36c27a89fec4",
  type: "page-type/lore",
  slug: "otherwhere-v-wolfman",
  title: "Wolfman",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-wolfman",
  facts: [
    {
      fact: "Wolfmen are a thinking people with fur, fangs, canine lips and pawed hands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some wolfmen wear the fur of their heads long and braided.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wolfman in a long hooded robe can pass for a tall, burly human monk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wolfmen are among the animal-peoples seen on the streets of Keihona.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wolfmen live in Gemore alongside humans and other peoples.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wolfman must hide what he is in Esebus, whose citizens are all human.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some wolfmen keep faith as clerics of gods now dead, such as Deiman.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
