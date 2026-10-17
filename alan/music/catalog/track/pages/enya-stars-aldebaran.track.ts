import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsAldebaran = {
  id: "01a14a1d-db50-7cb0-8074-c7077e681fb0",
  type: "page-type/track",
  slug: "enya-stars-aldebaran",
  ownLength: 3.0933333333333333,
  ownProgress: 3.0933333333333333,
  partOfCollections: ["release/enya-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "Aldebaran",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "aldebaran|6uothxMWeLWIhsGeF7cyo4|185600",
  song: "song/enya-aldebaran",
  carriedBy: [
    {
      release: "release/enya-stars",
      discNumber: 1,
      position: 6,
      externalId: "7tUHU0HT6Aq1iNWsHLC1s7",
      externalLink: "https://open.spotify.com/track/7tUHU0HT6Aq1iNWsHLC1s7",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
