import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVGloamberry = {
  id: "01a0ea09-2b1f-71a3-b217-71f0f54edbd8",
  type: "page-type/lore",
  slug: "otherwhere-v-gloamberry",
  title: "Gloamberry",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-gloamberry",
  facts: [
    {
      fact: "Gloamberries grow on low, smooth, red-stemmed bushes in deep shade under scalebarks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gloamberries are glossy and blue-black, and taste sweet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gloamberries are poisonous: within an hour they bring cramps and vomiting.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A handful of gloamberries means a day of sickness and fever; a bellyful can kill a child.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vomiting early and drinking plenty of water shortens gloamberry sickness.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Valley children learn the rhyme "red stem, dead stem" to keep off gloamberries.',
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
