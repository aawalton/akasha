import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFirstLoveRemixesFirstLoveAshworthRemix = {
  id: "01a0b111-31f1-7c9f-8d8e-7be1935e5adb",
  type: "page-type/track",
  slug: "sabrina-carpenter-first-love-remixes-first-love-ashworth-remix",
  ownLength: 3.1708666666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-first-love-remixes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "21HUuj1qSnAFn5iSOIlq6v",
      externalLink: "https://open.spotify.com/track/21HUuj1qSnAFn5iSOIlq6v",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "First Love - Ashworth Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3hyEbRtp617pNCuuQjyOmc", artistName: "Lost Kings" },
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "3pcGjcfEW3YD2Hfk6tDR5S", artistName: "Ashworth" },
  ],
  trackKey:
    "firstloveashworthremix|3hyEbRtp617pNCuuQjyOmc,3pcGjcfEW3YD2Hfk6tDR5S,74KM79TiuVKeVCqs8QtB0B|190252",
  song: "song/sabrina-carpenter-first-love",
} as const satisfies Track
