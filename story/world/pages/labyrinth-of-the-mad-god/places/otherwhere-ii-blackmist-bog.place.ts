import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiBlackmistBog = {
  id: "01a0e9ba-dd9e-73de-980f-81d39665375b",
  type: "page-type/place",
  slug: "otherwhere-ii-blackmist-bog",
  title: "Blackmist Bog",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-drezen",
  facts: [
    {
      fact: "Blackmist Bog is a vast swamp of giant frogs, insects and horrors from another plane.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Blackmist is an inky fog that rolls in and blinds everything it swallows.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A blood moon rises over the bog and rouses otherworldly swarmlings whose touch is fatal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Redfangs, beasts that shoot their feathers, prowl the bog.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A monthly flower grows here that sates hunger and thirst and acts as a mild stimulant.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An abandoned mine below the bog holds mining machines, glowing ore and green minerals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A flesh-render matriarch and her centipede-like brood rule the mine's lower tunnels.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Global events escalate across the bog as more people reach the tower.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hidden doorways lead into the tower from the bog.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
