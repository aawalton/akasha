import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveGorgonsBindings = {
  id: "01a0e9fa-71c1-7a36-a65d-86bb7d9c8f3b",
  type: "page-type/lore",
  slug: "super-supportive-gorgons-bindings",
  title: "Gorgon's bindings",
  world: "world/super-supportive",
  about: "world-mechanic/super-supportive-gorgons-bindings",
  facts: [
    {
      fact: "Glowing golden ropes of magic chain Gorgon to the consulate desk, trailing like jellyfish.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "They also bar talk of chaos, his own kind and extra-dimensional incursions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Speaking past them costs him; one outburst was a costly moment of melancholy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The binding spell framework can partly read his true intentions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He clicks when he wants to say something he cannot, and goes flat near advice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He may give directions, register classes, witness pre-affixation trades and hand out pens.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
