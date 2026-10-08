import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesParachutes = {
  id: "01a0b9ee-ea15-70c3-a8ec-b0db74c60f88",
  type: "page-type/track",
  slug: "coldplay-parachutes-parachutes",
  ownLength: 0.77,
  ownProgress: 0.77,
  partOfCollections: ["release/coldplay-parachutes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Parachutes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "parachutes|4gzpq5DPGxSnKTe4SA8HAU|46200",
  song: "song/coldplay-parachutes",
  carriedBy: [
    {
      release: "release/coldplay-parachutes",
      discNumber: 1,
      position: 7,
      externalId: "4qzoHxgp42ylb18ga1SWTL",
      externalLink: "https://open.spotify.com/track/4qzoHxgp42ylb18ga1SWTL",
    },
  ],
  createdAt: "2026-09-19T13:50:37.589Z",
  updatedAt: "2026-09-24T19:59:17.000Z",
} as const satisfies Track
