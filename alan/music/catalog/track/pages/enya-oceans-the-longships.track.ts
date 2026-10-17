import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansTheLongships = {
  id: "01a14a1d-db4f-71e2-ad7d-98edc488815a",
  type: "page-type/track",
  slug: "enya-oceans-the-longships",
  ownLength: 3.6473333333333335,
  ownProgress: 3.6473333333333335,
  partOfCollections: ["release/enya-oceans"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Longships",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "thelongships|6uothxMWeLWIhsGeF7cyo4|218840",
  song: "song/enya-the-longships",
  carriedBy: [
    {
      release: "release/enya-oceans",
      discNumber: 1,
      position: 12,
      externalId: "3xbRV3WfuxxoSWRl27iQED",
      externalLink: "https://open.spotify.com/track/3xbRV3WfuxxoSWRl27iQED",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
