import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixComeAlongComeAlong = {
  id: "01a1546f-24f6-7847-843b-fc913593d2c0",
  type: "page-type/track",
  slug: "pentatonix-come-along-come-along",
  ownLength: 3.015833333333333,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-come-along"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Come Along",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "comealong|26AHtbjWKiwYzsoGoUZq53|180950",
  song: "song/pentatonix-come-along",
  carriedBy: [
    {
      release: "release/pentatonix-come-along",
      discNumber: 1,
      position: 1,
      externalId: "52J0xWYEGceLicOiziLNFp",
      externalLink: "https://open.spotify.com/track/52J0xWYEGceLicOiziLNFp",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
