import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLinebreakers = {
  id: "01a0ea7e-1cbe-7684-b279-0298fdae22db",
  type: "page-type/lore",
  slug: "otherwhere-xi-linebreakers",
  title: "The Linebreakers",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-linebreakers",
  facts: [
    {
      fact: "Solfis formed the Linebreakers after the Battle of Sardanal's Cradle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Linebreakers are drawn from thralls freed from Nemeti fate magic at the Battle of the Pass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most of the freed thralls were Hallurians who fell to the Nemeti.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The freed thralls once worshipped Viviane as the Godbreaker, under a banner of her dead foes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Linebreakers fight in heavy armour and carry no shields.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Linebreakers marched in Harrak's army in the war against the Pure League.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
