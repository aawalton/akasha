import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayInMyPlaceInMyPlace = {
  id: "01a0b9ef-0194-79c7-ad32-0c9015f24b53",
  type: "page-type/track",
  slug: "coldplay-in-my-place-in-my-place",
  ownLength: 3.81555,
  ownProgress: 3.81555,
  partOfCollections: ["release/coldplay-in-my-place"],
  status: "completed",
  unit: "unit/minutes",
  title: "In My Place",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "inmyplace|4gzpq5DPGxSnKTe4SA8HAU|228933",
  song: "song/coldplay-in-my-place",
  carriedBy: [
    {
      release: "release/coldplay-in-my-place",
      discNumber: 1,
      position: 1,
      externalId: "2aXZp30TocFnABRPF1Isrl",
      externalLink: "https://open.spotify.com/track/2aXZp30TocFnABRPF1Isrl",
    },
  ],
  createdAt: "2026-09-19T13:50:43.604Z",
  updatedAt: "2026-09-24T19:59:17.000Z",
} as const satisfies Track
