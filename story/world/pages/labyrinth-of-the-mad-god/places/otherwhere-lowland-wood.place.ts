import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereLowlandWood = {
  id: "01a0e98e-a9b8-760c-b499-173eb506ff12",
  type: "page-type/place",
  slug: "otherwhere-lowland-wood",
  title: "The Lowland Wood",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-cinder-isle",
  facts: [
    {
      fact: "The Lowland Wood is thick, humid forest running from the Black Shore's trees to the foothills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the treeline to the foothills is some four miles of steadily rising ground.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Under the canopy the light is green and dim, the air still and wet, and cooler than the sand.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-nala"],
    },
    {
      fact: "The mountain cannot be seen under the canopy, only from clearings and treefalls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The forest floor is leaf litter over roots and sharp stones, hard going on bare feet.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-nala"],
    },
    {
      fact: "Hooked thornvine hangs in the gaps between trees and tears skin and cloth.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-nala"],
    },
    {
      fact: "A game trail runs from the treeline east and a little south, toward the Glassrun.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "About a mile in, the game trail passes the Old Strangler, a huge hollow fig.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cupleaf grows in the shade, its leaf cups holding a mouthful or two of rainwater each.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bloodfruit trees grow in the sunnier gaps, their red fruit high up and ripe now.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-nala"],
    },
    {
      fact: "A copperback troop ranges the wood's western half, loud in the canopy by day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mire monitors hunt the wood's wet ground and lie up by water.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ashback hunts the wood's edge at dusk and dawn; the wood goes silent when it passes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At dusk emberflies rise in clouds from the wet ground.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
