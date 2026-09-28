import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSerrinfordGreen = {
  id: "01a0e9fe-958d-731d-ac97-4fb573113c86",
  type: "page-type/place",
  slug: "otherwhere-v-serrinford-green",
  title: "Serrinford Green",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-serrinford",
  exits: [
    {
      to: "place/otherwhere-v-serrinford",
      way: "Lanes run off the green to the Wood Gate north and the River Gate south, each a minute away.",
    },
  ],
  facts: [
    {
      fact: "Serrinford Green is a trampled square of grass at the village's heart, the market ground.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stone well with a wooden sweep sits in the middle of the green.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The headman's longhouse fronts the green's north side; the inn and shrine are a lane off.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Goats and children wander the green by day; women gossip at the well each morning.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Every sixth day the green fills with a market of barley, beans, cheese, pork, pots and cloth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At market most goods change hands by barter; eggs and salt serve as small change.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At each new moon Treeborn traders spread furs, honey, resin and bark medicines on the green.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Treeborn take salt, iron and cloth in trade and never stay inside the palisade overnight.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
