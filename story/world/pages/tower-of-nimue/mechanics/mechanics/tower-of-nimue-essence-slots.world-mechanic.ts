import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const towerOfNimueEssenceSlots = {
  id: "01a0deeb-597e-78e1-82ff-d3e41aec23e7",
  type: "page-type/world-mechanic",
  slug: "tower-of-nimue-essence-slots",
  title: "Essence Slots",
  world: "world/tower-of-nimue",
  description:
    "A climber starts with 3 essence slots. An essence in a slot grants a passive trait and usually an active ability, whose potency scales with ATT and with the essence's rank, about the tier of the floor it came from. Harvesting into an open slot is a free pick. When every slot is full, a new essence permanently displaces one already held, and the discarded essence is lost forever. High ATT against the essence's rank integrates it cleanly; low ATT brings a temporary backlash. Each Gatekeeper, at floors 10, 25, 50 and 75, adds a slot, taking a climber from 3 slots to 7.",
} as const satisfies WorldMechanic
