import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVCustoms = {
  id: "01a0ea05-739a-7a87-aa6c-d812dedaaf15",
  type: "page-type/lore",
  slug: "otherwhere-v-customs",
  title: "Customs",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-customs",
  facts: [
    {
      fact: "A common salute is a hand held against the forehead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mages swear their most solemn oaths on their magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A sworn Oath binds; the sworn swear "on my Oath" and speak of walking their own Path.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gladiatorial combat, usually with some risk of death, is common across Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arenas charge a base fee to enter and pay a kingly reward for beating a Questor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Many cultures have adapted in varied ways to the pressure of monsters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Histories frame Questors as causes of change, divine interventions or great people.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
