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
    "The head of the den, where the Host's high-backed chair lies smashed to splinters in the muck. Beside the wreck the Host's true form lies dead, lean and grey. A sheer drop the haven hid is torn across the floor between the wreck and a plain stair climbing into the dark, and on the stair's side of the drop the midden has been burned to char. In the dark past the wreck, a wounded, wrong-jointed cold creature drags itself over the stone.",
  exits: [
    { way: "the plain ascending stair, across the drop" },
    { to: "place/the-tower-the-deep-den", way: "the den behind" },
  ],
  facts: [
    "The Host's Seat's false gold came from the Host, and died with his true form.",
    "The False Haven's illusion died all at once when the Host's true form fell.",
    "The Host's Seat holds no water.",
  ],
} as const satisfies Place
