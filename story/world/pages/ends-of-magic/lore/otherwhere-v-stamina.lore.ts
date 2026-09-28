import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVStamina = {
  id: "01a0e9f9-efb4-723d-97f5-444562f1fc38",
  type: "page-type/lore",
  slug: "otherwhere-v-stamina",
  title: "Stamina",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-stamina",
  facts: [
    {
      fact: "Stamina is a resource some classes grant; it keeps the body going.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A fighting class can unlock Stamina as its first class skill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stamina accumulates during periods of rest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stamina is spent to improve the speed and strength of movement.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Other skills and Talents can draw on Stamina too.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Stamina shows under its class in the status as current over maximum, e.g. "Stamina: 250/250".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A new level-15 brawler had 250 Stamina.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An enhanced leap costs about one point of Stamina.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An enhanced sprint down a tall tower's stairs burned 100 Stamina.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stamina can boost physical labor such as digging.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Enough Stamina lets a runner outpace a horse.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Stamina maximum rises by a fixed amount each class level.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stronger classes carry stronger forms of the resource under new names.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "With Stamina and Focus together, a person can go days without sleep.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
