import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerTheHostsSeat = {
  id: "01a0d441-195c-765e-a0f6-044c8eecff68",
  type: "page-type/place",
  slug: "the-tower-the-hosts-seat",
  title: "The Host's Seat",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-05",
  depth: 5,
  description:
    "The gold gathers itself for one last, best lie: a high-backed chair at the head of the long table, and in it the Host — the gracious one, hands folded, smiling like he has all the time in the world and is pleased you came so far. This is the loom of the whole haven. When you raise a weapon he does not flinch — he MULTIPLIES: five of him around the table, then seven, every one identical, every one casting a shadow, every one warm, every one reflected, every one saying come, sit, you've earned it. Strike the wrong one and the others are still smiling while you bleed. And the note said it: kill it twice.",
  exits: [
    { way: "the real ascending stair ahead (on clearing)" },
    { to: "place/the-tower-the-deep-den", way: "the den behind" },
  ],
  facts: [
    "The Host's Seat's false gold came from the Host, and died with his true form.",
    "The False Haven's illusion died all at once when the Host's true form fell.",
    "The Host's Seat holds no water.",
  ],
} as const satisfies Place
