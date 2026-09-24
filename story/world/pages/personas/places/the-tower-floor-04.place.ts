import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerFloor04 = {
  id: "01a0d440-70c7-78f4-929b-91a2edeb618a",
  type: "page-type/place",
  slug: "the-tower-floor-04",
  title: "The Ascending Dark",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  depth: 4,
  description:
    "Beyond the arch is a vertical shaft — a lightless throat of the Tower with no floor, only a stair that climbs the wall in broken flights and, beyond them, great slabs of stone hanging still in the dark where the counterweight left them. Cold updraft from below carries the smell of dry dust and old grease. The far-up dark holds a single faint seam of grey light: the way out, high above. There is no level ground here, and the long fall is under everything. The Gloomward Stalker that hunted the unlit gaps is dead, and the Counterweight Colossus lies in pieces at the top.",
  exits: [
    {
      to: "place/the-tower-floor-05",
      way: "ascending stair to the grey-lit seam at the shaft's top, open",
    },
  ],
  facts: ["The Ascending Dark is bone-dry, smelling of dust and old grease."],
} as const satisfies Place
