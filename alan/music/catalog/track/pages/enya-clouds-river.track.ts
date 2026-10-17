import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaCloudsRiver = {
  id: "01a14a1d-db4c-725c-b66a-02e1ba6a06e3",
  type: "page-type/track",
  slug: "enya-clouds-river",
  ownLength: 3.18955,
  ownProgress: 3.18955,
  partOfCollections: ["release/enya-clouds"],
  status: "completed",
  unit: "unit/minutes",
  title: "River",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "river|6uothxMWeLWIhsGeF7cyo4|191373",
  song: "song/enya-river",
  carriedBy: [
    {
      release: "release/enya-clouds",
      discNumber: 1,
      position: 10,
      externalId: "4E7ybsSRugfJNf66TWrhz0",
      externalLink: "https://open.spotify.com/track/4E7ybsSRugfJNf66TWrhz0",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
