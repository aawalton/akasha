import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerFloorboardNote = {
  id: "01a0d445-b9e0-7bcd-9527-861bd8272175",
  type: "page-type/lore",
  slug: "the-tower-floorboard-note",
  title: "The Floorboard Note",
  world: "world/personas",
  about: "item/the-tower-floorboard-note",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The floorboard note in the Hall of Welcome begins \"DON'T EAT. DON'T SLEEP.\"",
    'The floorboard note says "DON\'T LET THE KIND ONES TOUCH YOU."',
    'The floorboard note says "THEY LEARN YOUR TRICKS — IT FAKES THE SHADOWS NOW, IT\'LL FAKE MORE."',
    'The floorboard note says "ONLY YOUR OWN FIRE STAYS HONEST."',
    'The floorboard note says "THE REAL ONE IS DEEP IN, AT THE HEAD OF THE TABLE."',
    'The floorboard note ends "KILL IT TWICE."',
  ],
} as const satisfies Lore
