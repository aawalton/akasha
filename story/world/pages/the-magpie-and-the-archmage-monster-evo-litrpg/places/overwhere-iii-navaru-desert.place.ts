import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiNavaruDesert = {
  id: "01a0ed31-c669-7740-a14a-47f07a64dc02",
  type: "page-type/place",
  slug: "overwhere-iii-navaru-desert",
  title: "The Navaru Desert",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-the-anthill",
      way: "Down through one of the many sand holes into the anthill.",
      direction: "down",
    },
    {
      to: "place/overwhere-iii-the-desert-kingdom",
      way: "Across the sands to the kingdom's border village, southwest.",
    },
  ],
  facts: [
    {
      fact: "The Navaru desert is a vast true desert in the far south, beyond the Dominion's reach.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lies many weeks of travel south of the Wrenmark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its days are blisteringly hot; its nights can drop below freezing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Travelers move in the mornings and evenings and shelter at midday.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Antkin hold huge territories in it and build their cities underground.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A giant antkin anthill lies beneath its sands, with sand-hole exits all about.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A small human desert kingdom lies on its southwest side.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Desert sharks are common in its sands, as in deserts everywhere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A year ago the rot nearly killed the desert; it is recovering now.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
