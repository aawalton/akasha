import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerGalleryNave = {
  id: "01a0c661-2207-73fb-bc36-dade4bc9c044",
  type: "page-type/game-location",
  slug: "the-tower-gallery-nave",
  title: "The Resonant Nave",
  game: "game/the-tower",
  within: "game-location/the-tower-floor-03",
  depth: 3,
  description:
    "The long body of the gallery. Bronze resonance-plates stand at intervals down both walls, each taller than a man, ringing faintly at any sharp noise. Broken statues litter the floor — cover and rubble. The amber hum is loudest here; the air itself seems to carry sound too well.",
  exits: ["the spiral stair behind (down to the Cistern), and the open dais ahead"],
  conditions: [
    {
      name: "light",
      note: "amber, sourceless, even — good visibility throughout (Alan's weak PER is not punished here). The light dims slightly near downed plates.",
    },
    {
      name: "water",
      note: "NONE. The gallery is bone-dry — the warm dry air is part of the floor's character (and a deliberate contrast to the Cistern). No drink, no douse, no water trick available here. Pre-decided: do not confabulate a fountain or puddle.",
    },
  ],
  things: [
    {
      name: "bronze resonance-plates (down both walls)",
      use: "they AMPLIFY sound — the Cantor's whole power runs off them. Shatter or topple a plate (heavy, FIN/MIGHT or a thrown statue-chunk) and it goes dead. Each downed plate weakens the Cantor's reach. They also ring deafeningly if struck — a usable distraction/stagger.",
      note: "THE central interactable: the Cantor's weakness lives in the acoustics. Reading 'kill the plates' is the win.",
    },
    {
      name: "shattered statuary (across the floor)",
      use: "cover (break line of sound/sight); fist-to-head-sized chunks are throwable (FIN ranged, or hurled to shatter a plate at distance); a few long marble shards = improvised stabbing weapon (atk 3)",
      note: "abundant rubble — cover and ammunition both",
    },
    {
      name: "a fallen bronze plate (one already down, mid-nave)",
      use: "a dead zone — standing in its acoustic shadow muffles the Cantor's song (coordinator: intent bonus for fighting from here). Also a ~2m bronze sheet = heavy shield-cover.",
      note: "the pre-made safe spot — a reader should find and use it",
    },
    {
      name: "wall sconces (cold)",
      use: "none — long dead, no oil, no flame. The amber light is not from them.",
      note: "decided dead end; no fire source on this floor",
    },
  ],
} as const satisfies GameLocation
