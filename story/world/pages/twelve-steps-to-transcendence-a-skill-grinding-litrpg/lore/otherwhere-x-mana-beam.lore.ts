import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXManaBeam = {
  id: "01a0ea7a-2e1a-7712-adb8-7eb90e070b14",
  type: "page-type/lore",
  slug: "otherwhere-x-mana-beam",
  title: "Mana Beam",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-skill/otherwhere-x-mana-beam",
  facts: [
    {
      fact: "[Mana Beam] gathers mana at a focus's tip and fires a blinding beam.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It usually needs a focus such as a staff to keep mana from exploding in the arms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Using mana that way is known to be difficult; mastering it young marks great skill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A beam can knock a flier from the sky at long range.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Firing a beam bare-handed, with no focus, shocks trained mages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its rarity has not been shown.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clarissa, a noble prodigy her friends call a sniper, uses it with a wooden staff.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
