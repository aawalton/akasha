import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPtxRunToYou = {
  id: "01a1546f-24fd-79e8-9b08-d450f8d5d81c",
  type: "page-type/track",
  slug: "pentatonix-ptx-run-to-you",
  ownLength: 4.43155,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-ptx"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Run to You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "runtoyou|26AHtbjWKiwYzsoGoUZq53|265893",
  song: "song/pentatonix-run-to-you",
  carriedBy: [
    {
      release: "release/pentatonix-ptx",
      discNumber: 1,
      position: 15,
      externalId: "4gGNzDNwhkZmlraXdGewSc",
      externalLink: "https://open.spotify.com/track/4gGNzDNwhkZmlraXdGewSc",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
