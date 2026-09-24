import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineDeluxeBrighterDaysAheadACappellaVersionYesAndACappella = {
  id: "01a0a6c5-424a-7112-9bf4-f8b430845ff3",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-deluxe-brighter-days-ahead-a-cappella-version-yes-and-a-cappella",
  ownLength: 3.2775166666666666,
  ownProgress: 3.2775166666666666,
  partOfCollections: [
    "release/ariana-grande-eternal-sunshine-deluxe-brighter-days-ahead-a-cappella-version",
    "release/ariana-grande-yes-and",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "yes, and? - a cappella",
  trackType: "a-cappella",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "yesandacappella|66CXWjxzNUsdJxJ2JdwvnR|196651",
  song: "song/ariana-grande-yes-and",
  carriedBy: [
    {
      release:
        "release/ariana-grande-eternal-sunshine-deluxe-brighter-days-ahead-a-cappella-version",
      discNumber: 1,
      position: 28,
      externalId: "6W0ZuLCsNGYrEDoosglSi7",
      externalLink: "https://open.spotify.com/track/6W0ZuLCsNGYrEDoosglSi7",
    },
    {
      release: "release/ariana-grande-yes-and",
      discNumber: 1,
      position: 5,
      externalId: "61qw8LTaRFn11q37hQB6ns",
      externalLink: "https://open.spotify.com/track/61qw8LTaRFn11q37hQB6ns",
    },
  ],
} as const satisfies Track
