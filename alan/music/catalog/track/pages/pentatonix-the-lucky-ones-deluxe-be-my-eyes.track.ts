import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixTheLuckyOnesDeluxeBeMyEyes = {
  id: "01a1546f-2500-7e1c-a735-2f8160fb5e0b",
  type: "page-type/track",
  slug: "pentatonix-the-lucky-ones-deluxe-be-my-eyes",
  ownLength: 3.42,
  ownProgress: 0,
  partOfCollections: [
    "release/pentatonix-the-lucky-ones-deluxe",
    "release/pentatonix-the-lucky-ones-2",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Be My Eyes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "bemyeyes|26AHtbjWKiwYzsoGoUZq53|205200",
  song: "song/pentatonix-be-my-eyes",
  carriedBy: [
    {
      release: "release/pentatonix-the-lucky-ones-2",
      discNumber: 1,
      position: 4,
      externalId: "37Dbv6bTxdXIpqdUW3L7ZS",
      externalLink: "https://open.spotify.com/track/37Dbv6bTxdXIpqdUW3L7ZS",
    },
    {
      release: "release/pentatonix-the-lucky-ones-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "64PVOVErp5iPCJbPl1m6Iy",
      externalLink: "https://open.spotify.com/track/64PVOVErp5iPCJbPl1m6Iy",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
