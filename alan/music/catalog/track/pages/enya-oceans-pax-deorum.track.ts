import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansPaxDeorum = {
  id: "01a14a1d-db4e-7002-a173-abea2fbcc736",
  type: "page-type/track",
  slug: "enya-oceans-pax-deorum",
  ownLength: 4.906,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Pax Deorum",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "paxdeorum|6uothxMWeLWIhsGeF7cyo4|294360",
  song: "song/enya-pax-deorum",
  carriedBy: [
    {
      release: "release/enya-oceans",
      discNumber: 1,
      position: 11,
      externalId: "28bS8ThAb5hFu60E7ItKXr",
      externalLink: "https://open.spotify.com/track/28bS8ThAb5hFu60E7ItKXr",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
