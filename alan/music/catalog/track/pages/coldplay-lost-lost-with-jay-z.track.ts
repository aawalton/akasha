import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLostLostWithJayZ = {
  id: "01a0b9ee-fb92-7280-b452-35cc4df974f3",
  type: "page-type/track",
  slug: "coldplay-lost-lost-with-jay-z",
  ownLength: 4.2817,
  ownProgress: 4.2817,
  partOfCollections: ["release/coldplay-lost"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lost+ (with Jay-Z)",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "lostwithjayz|4gzpq5DPGxSnKTe4SA8HAU|256902",
  song: "song/coldplay-lost",
  carriedBy: [
    {
      release: "release/coldplay-lost",
      discNumber: 1,
      position: 4,
      externalId: "4SwVcoBjjawbnexIiUDLc5",
      externalLink: "https://open.spotify.com/track/4SwVcoBjjawbnexIiUDLc5",
    },
  ],
  createdAt: "2026-09-19T13:50:42.066Z",
  updatedAt: "2026-09-24T19:59:17.000Z",
} as const satisfies Track
