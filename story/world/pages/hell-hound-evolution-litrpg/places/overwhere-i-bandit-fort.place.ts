import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIBanditFort = {
  id: "01a0ed29-8e6f-77ee-bbc7-1d410f64f2c5",
  type: "page-type/place",
  slug: "overwhere-i-bandit-fort",
  title: "The Bandit Fort",
  world: "world/hell-hound-evolution-litrpg",
  facts: [
    {
      fact: "The bandit fort is a shoddy, vine-covered hilltop structure hidden in the southern forest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The bandit fort shows no lights at night, to stay hidden.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A large, fast white-water river runs near the bandit fort.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The fort housed more than thirty Iron March deserters and a level 24 boss with a great sword.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The bandits kept Domesticated Drakewolves in spiked steel collars at the fort.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Archers with barbed arrows kept watch from the trees around the fort.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Whistles signalled the fort: one soft note for alarm, three sharp ones for retreat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The boss of the fort is dead, killed by the Nameless Hell Hound, and his band is broken.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The fort now lies empty, its Drakewolves dead and its men fled or slain.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
