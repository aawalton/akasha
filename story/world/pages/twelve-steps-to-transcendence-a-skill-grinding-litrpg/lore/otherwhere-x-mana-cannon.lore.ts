import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXManaCannon = {
  id: "01a0ea7a-2e1a-764f-93c1-ed34f32a2003",
  type: "page-type/lore",
  slug: "otherwhere-x-mana-cannon",
  title: "Mana Cannon",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-skill/otherwhere-x-mana-cannon",
  facts: [
    {
      fact: "[Mana Cannon] is Uncommon, an evolution of [Mana Missile].",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It fires a beam of pure mana far stronger than a missile.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fired bare-handed, its blowback snaps bones and tears the arm's flesh.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fired through a staff focus it is far stronger, easier to aim and more efficient.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Overloaded with mana, it is harder to control.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nobles mistake it for a [Mana Beam] fired with no focus.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben is its only known holder, at level 5.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
