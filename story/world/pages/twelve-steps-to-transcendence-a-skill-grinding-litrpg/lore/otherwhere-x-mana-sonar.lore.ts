import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXManaSonar = {
  id: "01a0ea78-8086-7e73-851c-7713f0ff0c79",
  type: "page-type/lore",
  slug: "otherwhere-x-mana-sonar",
  title: "Mana Sonar",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-mana-sonar",
  facts: [
    {
      fact: "[Mana Sonar] is Uncommon, an evolution of [Mana Sense] that keeps its sensing aspect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Notice: "Congratulations! [Mana Sense - Lvl 10] (Common) has evolved into…"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…"[Mana Sonar - Lvl 1] (Uncommon)!"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It sends a mana pulse that echoes back like sonar, mapping physical objects.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Farther objects take longer to echo back.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At level 1 it barely covers the immediate vicinity.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In a busy place like a rushing river it floods the mind and causes headaches.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It can run in the background while fighting.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pulses can be made denser, sharper or wider.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "[Mana Manipulation] can tune its frequency to find hidden people.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "With [Focus] it reveals mana pathways inside monsters, but not inside humans.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It pairs well with the [Hunter] title for tracking.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Adaptive-stealth creatures such as Shadow Monkeys can slip past it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben holds it, at level 12.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
