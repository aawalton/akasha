import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrain2711 = {
  id: "01a0c43e-7527-7b80-b959-9fa1b959ef8c",
  type: "page-type/track",
  slug: "emei-scatterbrain-2-711",
  ownLength: 2.4854166666666666,
  ownProgress: 2.4854166666666666,
  partOfCollections: ["release/emei-scatterbrain-2", "release/emei-scatterbrain-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "711",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "711|7E2aQQjErJocovYFjYLzWU|149125",
  song: "song/emei-711",
  carriedBy: [
    {
      release: "release/emei-scatterbrain-2",
      discNumber: 1,
      position: 1,
      externalId: "0DRJILxCmuHsrJpYYqXMed",
      externalLink: "https://open.spotify.com/track/0DRJILxCmuHsrJpYYqXMed",
    },
    {
      release: "release/emei-scatterbrain-deluxe",
      discNumber: 1,
      position: 1,
      externalId: "4zqN0qznZHZXVTWCidQxpV",
      externalLink: "https://open.spotify.com/track/4zqN0qznZHZXVTWCidQxpV",
    },
  ],
} as const satisfies Track
