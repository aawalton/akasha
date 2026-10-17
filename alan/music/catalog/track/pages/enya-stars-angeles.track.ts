import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsAngeles = {
  id: "01a14a1d-db50-7918-a3e1-2b288758fb63",
  type: "page-type/track",
  slug: "enya-stars-angeles",
  ownLength: 3.9644333333333335,
  ownProgress: 3.9644333333333335,
  partOfCollections: ["release/enya-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "Angeles",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "angeles|6uothxMWeLWIhsGeF7cyo4|237866",
  song: "song/enya-angeles",
  carriedBy: [
    {
      release: "release/enya-stars",
      discNumber: 1,
      position: 3,
      externalId: "4ztoKGohow9VHP8fTTM3SX",
      externalLink: "https://open.spotify.com/track/4ztoKGohow9VHP8fTTM3SX",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
