import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxCalendar = {
  id: "01a0ea39-ef3f-7803-a0b2-b8b03b96b7d6",
  type: "page-type/lore",
  slug: "otherwhere-ix-calendar",
  title: "Calendar",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-calendar",
  facts: [
    {
      fact: "Entrereans count their years as years of the Fifth Star.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The current year is the 2600th year of the Fifth Star.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A year is written by its number alone, as in 2580, twenty years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The year is split into quarters, and taxes fall due each quarter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Months are kept, and some contracts renew each month.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Days are grouped into weeks, and the arena schedules bouts by the week.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A fortnight is a common span, as in a promise kept within the fortnight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Magul dynasty took the throne about six hundred years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
