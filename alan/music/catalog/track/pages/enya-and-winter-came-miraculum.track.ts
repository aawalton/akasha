import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaAndWinterCameMiraculum = {
  id: "01a14a1d-db49-7643-bdca-bf0eca5963c2",
  type: "page-type/track",
  slug: "enya-and-winter-came-miraculum",
  ownLength: 3.89615,
  ownProgress: 3.89615,
  partOfCollections: ["release/enya-and-winter-came"],
  status: "completed",
  unit: "unit/minutes",
  title: "Miraculum",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "miraculum|6uothxMWeLWIhsGeF7cyo4|233769",
  song: "song/enya-miraculum",
  carriedBy: [
    {
      release: "release/enya-and-winter-came",
      discNumber: 1,
      position: 13,
      externalId: "6uAPxWiyT6h9SCBJGTl6za",
      externalLink: "https://open.spotify.com/track/6uAPxWiyT6h9SCBJGTl6za",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
