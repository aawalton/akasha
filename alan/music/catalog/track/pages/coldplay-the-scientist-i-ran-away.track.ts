import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheScientistIRanAway = {
  id: "01a0b9ef-026c-7240-98ca-f0e8e158414d",
  type: "page-type/track",
  slug: "coldplay-the-scientist-i-ran-away",
  ownLength: 4.447766666666666,
  ownProgress: 4.447766666666666,
  partOfCollections: ["release/coldplay-the-scientist"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Ran Away",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "iranaway|4gzpq5DPGxSnKTe4SA8HAU|266866",
  song: "song/coldplay-i-ran-away",
  carriedBy: [
    {
      release: "release/coldplay-the-scientist",
      discNumber: 1,
      position: 3,
      externalId: "1DQoNwxygxmQVH972Ha75w",
      externalLink: "https://open.spotify.com/track/1DQoNwxygxmQVH972Ha75w",
    },
  ],
  createdAt: "2026-09-19T13:50:43.820Z",
  updatedAt: "2026-09-24T19:59:17.000Z",
} as const satisfies Track
