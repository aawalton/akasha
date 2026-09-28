import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVBrookberry = {
  id: "01a0ea09-2b1e-7c0b-861f-e13b905f79c2",
  type: "page-type/lore",
  slug: "otherwhere-v-brookberry",
  title: "Brookberry",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-brookberry",
  facts: [
    {
      fact: "Brookberries grow on arching thorny canes along streams in sun gaps of the Greyscale Wood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brookberries are fingernail-sized, dark red when ripe, and hang in loose clusters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brookberries ripen in early autumn and are tart and safe to eat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A double handful of brookberries eases hunger a little but is no meal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brookberry canes and gloamberry bushes have the same toothed leaves and look alike at dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brookberry canes are thorned; gloamberry stems are smooth and red.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Serrinford boils brookberries into a sour jam traded at market for a tesk a pot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
