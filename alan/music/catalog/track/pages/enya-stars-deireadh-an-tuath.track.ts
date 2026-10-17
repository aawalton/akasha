import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsDeireadhAnTuath = {
  id: "01a14a1d-db51-7b7c-b438-a9ef79b80a40",
  type: "page-type/track",
  slug: "enya-stars-deireadh-an-tuath",
  ownLength: 1.7273333333333334,
  ownProgress: 1.7273333333333334,
  partOfCollections: ["release/enya-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "Deireadh an Tuath",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "deireadhantuath|6uothxMWeLWIhsGeF7cyo4|103640",
  song: "song/enya-deireadh-an-tuath",
  carriedBy: [
    {
      release: "release/enya-stars",
      discNumber: 1,
      position: 7,
      externalId: "252BzB1qTf2114W3R97qID",
      externalLink: "https://open.spotify.com/track/252BzB1qTf2114W3R97qID",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
