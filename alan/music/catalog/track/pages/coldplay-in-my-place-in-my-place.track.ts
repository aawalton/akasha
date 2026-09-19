import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayInMyPlaceInMyPlace = {
  id: "01a0b9ef-0194-79c7-ad32-0c9015f24b53",
  type: "page-type/track",
  slug: "coldplay-in-my-place-in-my-place",
  ownLength: 3.81555,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-in-my-place"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2aXZp30TocFnABRPF1Isrl",
      externalLink: "https://open.spotify.com/track/2aXZp30TocFnABRPF1Isrl",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In My Place",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "inmyplace|4gzpq5DPGxSnKTe4SA8HAU|228933",
  song: "song/coldplay-in-my-place",
} as const satisfies Track
