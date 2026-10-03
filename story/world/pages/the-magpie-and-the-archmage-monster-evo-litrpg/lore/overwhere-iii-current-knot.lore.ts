import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiCurrentKnot = {
  id: "01a0ff50-b20f-7c22-95b2-6d4d71cf4b23",
  type: "page-type/lore",
  slug: "overwhere-iii-current-knot",
  title: "Current Knot",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "world-skill/overwhere-iii-current-knot",
  facts: [
    {
      fact: "A Legend Mana Weaver can drag every raw current within reach into one knot at a chosen spot.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Clashing colors knotted with no weave's shape fight each other and burst.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "The burst strikes as a crushing blow at the knot's heart, and heavy within five paces of it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A knot costs none of her own mana; the currents are raw, not lent into a weave.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "A knot tied on a mage's shield tears the shield's weave apart as it bursts.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-mother-sallow",
      ],
    },
    {
      fact: "The burst blows any mist or working hung on the currents away with it.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Knotted currents fight her grip; holding the knot strains her, as a pull past the lending does.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Spent currents come back thin; a second knot in the same spot within the hour is barely a pop.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her first knot that bursts earns: [New skill acquired – Current Knot.]",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "[Current Knot – At [Basic] level, knot raw currents together until they burst.]",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "A knot dragged onto a charging beast lags behind it, and can tear loose unburst.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
  ],
} as const satisfies Lore
