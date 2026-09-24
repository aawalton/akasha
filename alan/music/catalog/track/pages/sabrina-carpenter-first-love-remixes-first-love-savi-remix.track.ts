import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFirstLoveRemixesFirstLoveSaviRemix = {
  id: "01a0b111-322e-739c-8714-e5c8b47579ee",
  type: "page-type/track",
  slug: "sabrina-carpenter-first-love-remixes-first-love-savi-remix",
  ownLength: 3.4166666666666665,
  ownProgress: 3.4166666666666665,
  partOfCollections: ["release/sabrina-carpenter-first-love-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "First Love - SAVI Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artistName: "Lost Kings" },
    { artist: "artist/sabrina-carpenter" },
    { artistName: "SAVI" },
  ],
  trackKey:
    "firstlovesaviremix|1H72fTOUAUl0WQ4kH5DPVW,3hyEbRtp617pNCuuQjyOmc,74KM79TiuVKeVCqs8QtB0B|205000",
  song: "song/sabrina-carpenter-first-love",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-first-love-remixes",
      discNumber: 1,
      position: 3,
      externalId: "1TMmQ5JK4EewfiIAISLpzl",
      externalLink: "https://open.spotify.com/track/1TMmQ5JK4EewfiIAISLpzl",
    },
  ],
} as const satisfies Track
