import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerGalleryAlcove = {
  id: "01a0c65d-1df7-76e1-b5a9-c2e0580c0f2c",
  type: "page-type/game-location",
  slug: "the-tower-gallery-alcove",
  title: "The Dead Alcove",
  game: "game/the-tower",
  within: "game-location/the-tower-floor-03",
  depth: 3,
  description:
    "A side recess off the nave, its walls hung with rotted acoustic baffling — felt and horsehair, centuries old. Inside it, sound DIES. The hum cuts to nothing the moment you step in. A reader who notices the silence understands the whole floor.",
  exits: ["back into the nave only"],
  conditions: [
    {
      name: "light",
      note: "dimmer amber; the alcove swallows light a little as it swallows sound",
    },
    { name: "water", note: "NONE — dry, like the rest of the floor." },
  ],
  things: [
    {
      name: "rotted acoustic baffling (the alcove walls)",
      use: "this is WHY the alcove is dead-silent — it eats sound. The Cantor is nearly mute in here (coordinator: the Cantor's ment attacks are halved or fail in/near the alcove). Tear panels free to carry a muffling baffle as a 'sound shield.'",
      note: "the readable answer to the Cantor — fight FROM here, or drag the fight here, and its power collapses",
    },
    {
      name: "a corpse in old robes (slumped in the corner)",
      use: "a previous climber. Carries a SILVER WHISTLE (a single piercing note — strikes every resonance-plate at once for a deafening stagger, usable once or twice before the Cantor adapts) and a cracked focus-crystal (mind/affinity seed).",
      note: "the whistle is a key item — turns the plates against the Cantor; reward for searching the silent room",
    },
    {
      name: "scratched words on the wall (above the corpse)",
      use: "a dying climber's note: 'IT SINGS THROUGH THE BRONZE — KILL THE BRONZE — THE STONE ONE ONLY WAKES AT THE ARCH.' Free lore-gate: tells a reader both weaknesses if they search here.",
      note: "rewards exploration with the floor's solution stated plainly — but only if Alan thinks to enter the silent room",
    },
  ],
} as const satisfies GameLocation
