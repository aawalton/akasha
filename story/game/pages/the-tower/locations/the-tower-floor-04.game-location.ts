import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerFloor04 = {
  id: "01a0c661-22a0-734c-bf3f-16aac82b1f2e",
  type: "page-type/game-location",
  slug: "the-tower-floor-04",
  title: "The Ascending Dark",
  game: "game/the-tower",
  depth: 4,
  theme:
    "The archway closes behind and the warm amber gallery is gone. Ahead is a vertical shaft — a lightless throat of the Tower with no floor, only a stair that climbs the wall in broken flights and, beyond them, slabs of stone that rise and fall through the dark on no visible mechanism. Cold updraft from below carries the smell of dry dust and old grease. The far-up dark holds a single faint seam of grey light: the way out, high above. There is no level ground here — only footing that moves, and the long fall under everything. Something hunts in the unlit gaps between the platforms; you hear it before you see it, and then you don't see it at all. (Continuity: reached by ASCENDING from floor 3 — the sealed arch on the Warden's dais opens onto the first broken flight of this shaft. Alan climbs UP into it. Do not narrate a descent; the threat here is falling, not descending.)",
  exits: [
    "ascending stair to the grey-lit seam at the shaft's top (sealed until the floor is cleared)",
  ],
} as const satisfies GameLocation
