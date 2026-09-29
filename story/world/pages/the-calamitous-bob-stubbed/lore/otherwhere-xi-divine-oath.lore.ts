import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDivineOath = {
  id: "01a0ea82-7962-75fb-9003-dac89eb49d3f",
  type: "page-type/lore",
  slug: "otherwhere-xi-divine-oath",
  title: "Divine Oath",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-mechanic/otherwhere-xi-divine-oath",
  facts: [
    {
      fact: "A divine oath is a vow sworn in a god's name, and the god enforces it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oaths sworn on Enttiku are taken most seriously; she touches the swearer's soul.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One who swears falsely on Enttiku upon pain of death dies.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Breaking an oath sworn on Enttiku brings her curse, which kills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "People swear on Enttiku even on their own souls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In an Oath of Neriad, a captive swears not to harm the captor's interests for a term.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An Oath of Neriad needs no circle, works on crowds, and drains the captive's mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An oath sworn on Neriad drains mana and shows a golden glow on the raised hand.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oaths to Neriad bind defectors against betrayal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oath breakers suffer terrible pain, and may die.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Oaths sworn under duress weigh less.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Students of Helock's Academy swear an oath under Nous.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Breaking an oath under Nous cripples a caster's conduits.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A soul oath kills its breaker on the spot; the liege may release it, but it cannot be forced.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Many civil servants are oath-bound.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Some paths demand that their followers swear allegiance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sovereigns cannot be forced to swear oaths at the Paramese council.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A priest can lift the curse of a broken oath by taking the sin upon themselves, even unto death.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
