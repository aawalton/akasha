import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiiWeirGardens = {
  id: "01a0ea1e-5a81-74e5-9584-1976338117ab",
  type: "page-type/place",
  slug: "otherwhere-viii-weir-gardens",
  title: "Weir Gardens",
  world: "world/breaker-of-horizons",
  facts: [
    {
      fact: "Weir Gardens is a small public park of lawns, plane trees and iron benches beside a river weir.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-viii-nala"],
    },
    {
      fact: "The park's lamps burn with a steady white light and no flame, each with a small mark on its glass.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-viii-nala"],
    },
    {
      fact: "The lamp marks are activation glyphs; the lamps are city artefacts fed arcana from a grid.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beyond the park railings a city street runs, with parked cars and buildings of six to ten storeys.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-viii-nala"],
    },
    {
      fact: "The park sits in a provincial city of the Empire, far from the capital and its Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A park warden walks the gardens at first light and moves sleepers on.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The nights here in early autumn are cool but not freezing.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
