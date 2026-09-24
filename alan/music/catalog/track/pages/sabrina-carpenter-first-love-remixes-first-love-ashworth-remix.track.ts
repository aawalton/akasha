import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFirstLoveRemixesFirstLoveAshworthRemix = {
  id: "01a0b111-31f1-7c9f-8d8e-7be1935e5adb",
  type: "page-type/track",
  slug: "sabrina-carpenter-first-love-remixes-first-love-ashworth-remix",
  ownLength: 3.1708666666666665,
  ownProgress: 3.1708666666666665,
  partOfCollections: ["release/sabrina-carpenter-first-love-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "First Love - Ashworth Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artistName: "Lost Kings" },
    { artist: "artist/sabrina-carpenter" },
    { artistName: "Ashworth" },
  ],
  trackKey:
    "firstloveashworthremix|3hyEbRtp617pNCuuQjyOmc,3pcGjcfEW3YD2Hfk6tDR5S,74KM79TiuVKeVCqs8QtB0B|190252",
  song: "song/sabrina-carpenter-first-love",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-first-love-remixes",
      discNumber: 1,
      position: 1,
      externalId: "21HUuj1qSnAFn5iSOIlq6v",
      externalLink: "https://open.spotify.com/track/21HUuj1qSnAFn5iSOIlq6v",
    },
  ],
} as const satisfies Track
