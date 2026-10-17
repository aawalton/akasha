import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaMayItBeTheFirstOfAutumn = {
  id: "01a14a1d-db4e-760b-aa68-cd8aeaa40c24",
  type: "page-type/track",
  slug: "enya-may-it-be-the-first-of-autumn",
  ownLength: 3.15155,
  ownProgress: 0,
  partOfCollections: ["release/enya-may-it-be"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The First of Autumn",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "thefirstofautumn|6uothxMWeLWIhsGeF7cyo4|189093",
  song: "song/enya-the-first-of-autumn",
  carriedBy: [
    {
      release: "release/enya-may-it-be",
      discNumber: 1,
      position: 3,
      externalId: "6qEuixBPBmptTONfEF5Zs1",
      externalLink: "https://open.spotify.com/track/6qEuixBPBmptTONfEF5Zs1",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
