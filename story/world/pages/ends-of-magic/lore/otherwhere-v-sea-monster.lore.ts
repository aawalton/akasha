import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSeaMonster = {
  id: "01a0e9fa-0d15-710b-85ad-539d048efd51",
  type: "page-type/lore",
  slug: "otherwhere-v-sea-monster",
  title: "Sea Monster",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-sea-monster",
  facts: [
    {
      fact: "Davrar's oceans are vast and hunted by monsters; ships rely on fog and sharp sight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ocean monsters swarm near the port of Keihona, held back from its palace by enchanted glass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Keihona's undersea rooms carry enchantments that calm monsters with mind magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One sea monster has a shark's front half and a rear of twelve squid tentacles.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shark-squid's tentacles bear hooked spikes instead of suckers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shark-squid lives in the deep waters off Keihona.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sailors rank redeyes as common sea beasts and leviathans as far greater ones.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
