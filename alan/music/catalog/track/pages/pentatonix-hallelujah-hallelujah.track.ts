import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixHallelujahHallelujah = {
  id: "01a1546f-24f8-7a8d-b4e2-86a2fe77e140",
  type: "page-type/track",
  slug: "pentatonix-hallelujah-hallelujah",
  ownLength: 4.482666666666667,
  ownProgress: 4.482666666666667,
  partOfCollections: ["release/pentatonix-hallelujah"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hallelujah",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "hallelujah|26AHtbjWKiwYzsoGoUZq53|268960",
  song: "song/pentatonix-hallelujah",
  carriedBy: [
    {
      release: "release/pentatonix-hallelujah",
      discNumber: 1,
      position: 1,
      externalId: "0LsRGxeE8zZjzOV5QrR8G2",
      externalLink: "https://open.spotify.com/track/0LsRGxeE8zZjzOV5QrR8G2",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
