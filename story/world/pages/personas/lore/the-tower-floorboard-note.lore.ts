import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerFloorboardNote = {
  id: "01a0d445-b9e0-7bcd-9527-861bd8272175",
  type: "page-type/lore",
  slug: "the-tower-floorboard-note",
  title: "The Floorboard Note",
  world: "world/personas",
  about: "story-item/the-tower-floorboard-note",
  facts: [
    {
      fact: "The floorboard note in the Hall of Welcome begins \"DON'T EAT. DON'T SLEEP.\"",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The floorboard note says "DON\'T LET THE KIND ONES TOUCH YOU."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The floorboard note says "THEY LEARN YOUR TRICKS — IT FAKES THE SHADOWS NOW, IT\'LL FAKE MORE."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The floorboard note says "ONLY YOUR OWN FIRE STAYS HONEST."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The floorboard note says "THE REAL ONE IS DEEP IN, AT THE HEAD OF THE TABLE."',
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: 'The floorboard note ends "KILL IT TWICE."', knowers: ["lore-disclosure/game-master"] },
  ],
} as const satisfies Lore
