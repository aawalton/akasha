import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansOnlyIf = {
  id: "01a14a1d-db4e-7939-90c0-671d5dd0d8bc",
  type: "page-type/track",
  slug: "enya-oceans-only-if",
  ownLength: 3.330433333333333,
  ownProgress: 3.330433333333333,
  partOfCollections: ["release/enya-oceans"],
  status: "completed",
  unit: "unit/minutes",
  title: "Only If",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "onlyif|6uothxMWeLWIhsGeF7cyo4|199826",
  song: "song/enya-only-if",
  carriedBy: [
    {
      release: "release/enya-oceans",
      discNumber: 1,
      position: 5,
      externalId: "4d7mwul19Ehi2l3F4vsiBj",
      externalLink: "https://open.spotify.com/track/4d7mwul19Ehi2l3F4vsiBj",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
