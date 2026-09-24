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
    "The archway closes behind and the warm amber gallery is gone. Ahead is a vertical shaft — a lightless throat of the Tower with no floor, only a stair that climbs the wall in broken flights and, beyond them, slabs of stone that rise and fall through the dark on no visible mechanism. Cold updraft from below carries the smell of dry dust and old grease. The far-up dark holds a single faint seam of grey light: the way out, high above. There is no level ground here — only footing that moves, and the long fall under everything. Something hunts in the unlit gaps between the platforms; you hear it before you see it, and then you don't see it at all.",
  exits: [
    {
      to: "place/the-tower-floor-05",
      way: "ascending stair to the grey-lit seam at the shaft's top (sealed until the floor is cleared)",
    },
  ],
  facts: ["The Ascending Dark is bone-dry, smelling of dust and old grease."],
} as const satisfies Place
