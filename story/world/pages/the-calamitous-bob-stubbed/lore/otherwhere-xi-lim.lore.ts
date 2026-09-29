import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLim = {
  id: "01a0ea8e-52d3-77e2-94ef-e7ce7d0f819b",
  type: "page-type/lore",
  slug: "otherwhere-xi-lim",
  title: "Lim the Fell-Handed",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-lim",
  facts: [
    {
      fact: "Lim the Fell-Handed is a northern woman of Helock's underworld with a deadly reputation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lim was clerk of the Wayfarers gang until Solfis took it over and kept her on.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lim became Solfis's second in Helock, running his crime network with her gang, Nim.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lim is a poisoner; her blackmailer's path lets her set off or halt a poison she has injected.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrak counts Lim an evil but useful ally; she ran a diversion in the Remnant war for Viv.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Lim is this season is unknown; Helock fell to Oleander that winter.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
