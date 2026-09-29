import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXManaMissile = {
  id: "01a0ea7a-2e1b-7f9e-bc6a-29518ab83955",
  type: "page-type/lore",
  slug: "otherwhere-x-mana-missile",
  title: "Mana Missile",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-skill/otherwhere-x-mana-missile",
  facts: [
    {
      fact: "[Mana Missile] is Common: pure mana detonates in the arm and bursts out of the palm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It fires a fist-sized azure bolt with a loud blast and heavy recoil.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It can blow a large hole through a thick tree trunk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Without a construct the recoil hurts badly and can shatter the arm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A gun-barrel construct in the arm cuts recoil, but only for a few shots.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Overuse tears the arm even under [Warforged]; steady use slowly toughens the arms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Spinning several missiles together can drill through a boulder but mangles the arms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is offered after experimenting with raw mana blasts until the System recognizes one.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its level 10 paths: base [Mana Missile], [Mana Scattershot], [Mana Drill], [Mana Cannon].",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben made it himself and evolved it into the Uncommon [Mana Cannon].",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
