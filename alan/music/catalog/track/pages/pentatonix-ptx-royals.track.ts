import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPtxRoyals = {
  id: "01a1546f-24fd-7aa0-a73c-e65969c1ce96",
  type: "page-type/track",
  slug: "pentatonix-ptx-royals",
  ownLength: 3.8411,
  ownProgress: 3.8411,
  partOfCollections: ["release/pentatonix-ptx"],
  status: "completed",
  unit: "unit/minutes",
  title: "Royals",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "royals|26AHtbjWKiwYzsoGoUZq53|230466",
  song: "song/pentatonix-royals",
  carriedBy: [
    {
      release: "release/pentatonix-ptx",
      discNumber: 1,
      position: 11,
      externalId: "18hj0s8eHtGt30whr2PGXB",
      externalLink: "https://open.spotify.com/track/18hj0s8eHtGt30whr2PGXB",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
