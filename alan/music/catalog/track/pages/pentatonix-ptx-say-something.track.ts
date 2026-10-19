import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPtxSaySomething = {
  id: "01a1546f-24fd-7f54-994d-860f369af503",
  type: "page-type/track",
  slug: "pentatonix-ptx-say-something",
  ownLength: 4.5311,
  ownProgress: 4.5311,
  partOfCollections: ["release/pentatonix-ptx"],
  status: "completed",
  unit: "unit/minutes",
  title: "Say Something",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "saysomething|26AHtbjWKiwYzsoGoUZq53|271866",
  song: "song/pentatonix-say-something",
  carriedBy: [
    {
      release: "release/pentatonix-ptx",
      discNumber: 1,
      position: 14,
      externalId: "2SrJ0Iw6GobiRGyh2XKZhV",
      externalLink: "https://open.spotify.com/track/2SrJ0Iw6GobiRGyh2XKZhV",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
