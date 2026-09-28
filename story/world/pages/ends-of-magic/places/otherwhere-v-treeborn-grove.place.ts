import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVTreebornGrove = {
  id: "01a0ea00-99a2-7374-ba67-0106500e2706",
  type: "page-type/place",
  slug: "otherwhere-v-treeborn-grove",
  title: "Ulathen Grove",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-greyscale-wood",
  exits: [
    {
      to: "place/otherwhere-v-scalebark-camp",
      way: "West through deep wood past the boundary stones to Scalebark Camp; a day and a half.",
      direction: "west",
    },
  ],
  facts: [
    {
      fact: "Ulathen Grove is a Treeborn tribe's home in the deep wood, a day and a half east of Fern Hollow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "About sixty Treeborn live at Ulathen among scalebarks far older and broader than any near the track.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their homes are woven platforms and bark-walled rooms high in the old trees, reached by ladders.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Ulathen Treeborn speak their own tongue; only their elder and two traders know Elothian.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Ulathen Treeborn are wary of outsiders and meet strangers with watchers and bows.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Spiral-carved boundary stones mark the grove's wood, two hundred yards east of Scalebark Camp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The grove trades furs, honey, resin and bark medicines to Serrinford for salt, iron and cloth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The grove resents Serrinford's woodcutters felling toward it and has warned them once.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A lone stranger who comes unarmed and harmless is watched, then led to the elder rather than shot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
