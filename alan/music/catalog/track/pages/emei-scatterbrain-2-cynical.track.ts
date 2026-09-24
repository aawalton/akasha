import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrain2Cynical = {
  id: "01a0c43e-7602-72ed-bbb2-ed623ac8619c",
  type: "page-type/track",
  slug: "emei-scatterbrain-2-cynical",
  ownLength: 2.2424166666666667,
  ownProgress: 2.2424166666666667,
  partOfCollections: ["release/emei-scatterbrain-2", "release/emei-scatterbrain-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cynical",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "cynical|7E2aQQjErJocovYFjYLzWU|134545",
  song: "song/emei-cynical",
  carriedBy: [
    {
      release: "release/emei-scatterbrain-2",
      discNumber: 1,
      position: 6,
      externalId: "0HoXKvtfGFB2CCQvOfNjcd",
      externalLink: "https://open.spotify.com/track/0HoXKvtfGFB2CCQvOfNjcd",
    },
    {
      release: "release/emei-scatterbrain-deluxe",
      discNumber: 1,
      position: 6,
      externalId: "7cPZrpNtQryhEjeJ4j4MkL",
      externalLink: "https://open.spotify.com/track/7cPZrpNtQryhEjeJ4j4MkL",
    },
  ],
} as const satisfies Track
