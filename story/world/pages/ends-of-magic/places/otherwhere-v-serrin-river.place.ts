import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSerrinRiver = {
  id: "01a0e9fc-f52d-7926-95fc-bd21c4e01809",
  type: "page-type/place",
  slug: "otherwhere-v-serrin-river",
  title: "The Serrin",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-serrin-vale",
  exits: [
    {
      to: "place/otherwhere-v-serrin-vale",
      way: "Downstream by boat or by the river road on the north bank to Harrowmere; three days.",
      direction: "south",
    },
  ],
  facts: [
    {
      fact: "The Serrin is a broad, cold, green river running down the middle of the Serrin Vale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At Serrinford the Serrin spreads over a gravel bar, knee to thigh deep in early autumn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Above and below the ford the Serrin runs deep in slow green pools under the banks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mudjaws lie in the Serrin's deep pools and take animals that drink or wade at the edges.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Villagers keep to the marked gravel line at the ford, where the water is too shallow for mudjaws.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rafts of scalebark logs are poled down the Serrin from Serrinford to Harrowmere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A river road runs along the Serrin's north bank from Serrinford to Harrowmere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Serrin's water is safe to drink; the villagers draw it above the sawyard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Five miles below Serrinford an old charcoal burners' hut sits back from the river road.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Two outlaws camp at the charcoal burners' hut and rob lone travellers on the river road.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
