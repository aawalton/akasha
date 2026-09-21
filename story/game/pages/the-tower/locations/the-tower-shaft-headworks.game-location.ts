import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerShaftHeadworks = {
  id: "01a0c661-22e5-7d37-9497-f27f87060ead",
  type: "page-type/game-location",
  slug: "the-tower-shaft-headworks",
  title: "The Headworks",
  game: "game/the-tower",
  within: "game-location/the-tower-floor-04",
  depth: 4,
  description:
    "The top of the shaft, where the slabs dock against a stone gantry and the grey-lit exit-stair finally appears, just beyond. The central chain terminates here, wound around an immense seated figure of fused stone and iron — the Counterweight Colossus, the warden that IS the floor's counterweight. It does not move until something tries to pass onto the exit-stair; its mass is the tension that holds every slab below in balance. Drop it, and the whole moving system goes still.",
  exits: [
    "the grey-lit exit-stair ahead; the moving dark behind (now stilled once the Colossus is down)",
  ],
  conditions: [
    {
      name: "light",
      note: "the grey seam from above reaches the gantry — the best ambient light on the floor, but still dim. A carried light is still wanted to read the Colossus's mechanism (the pawl is in shadow at its core).",
    },
    { name: "water", note: "NONE." },
  ],
  things: [
    {
      name: "the Counterweight Colossus (on the gantry)",
      use: "dormant until the exit-stair is approached or it is struck. It fills the only dock to the exit; it must be dropped. Its body is fused stone-and-iron over a great winding-drum at its core, around which the central chain is wound under load.",
      note: "the floor boss; geometry forces the fight, like floor 3's Golem — but the weakness here is a MECHANISM (the wound chain under tension), not a single block.",
    },
    {
      name: "the winding-drum / chain-pawl at the Colossus's core (its 'waist')",
      use: "THE weakness — the chain is wound around its core drum under enormous tension, held by a single iron pawl (a release-catch). A precise strike to the PAWL (INT to read the mechanism, FIN to place the hit — explicitly NOT a MIGHT contest) releases the drum: the stored tension of the whole counterweight system unwinds through the Colossus at once, tearing it apart and dropping the slabs still. See readableTrait gate.",
      note: "the entire boss fight is 'read the mechanism, hit the pawl' — Alan's INT+FIN, not his weak MIGHT. The note in the pinch names it ('drop the weight and the stair falls still').",
    },
    {
      name: "the grey-lit exit-stair (beyond the gantry)",
      use: "the way up and off the floor. Keyed to the floor's wardens — the Stalker and the Colossus must both fall. Once the Colossus drops and the slabs still, the gantry is safe to cross. Flush-sealed until cleared; no lever.",
      note: "clearing the floor opens it; with the slabs stilled, the final crossing is trivial — the reward for solving the mechanism is a safe exit.",
    },
  ],
} as const satisfies GameLocation
