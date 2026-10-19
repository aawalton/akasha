import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixTheLuckyOnesDeluxeCoffeeInBed = {
  id: "01a1546f-2500-7fc0-8fb6-32151037ee3f",
  type: "page-type/track",
  slug: "pentatonix-the-lucky-ones-deluxe-coffee-in-bed",
  ownLength: 3.258,
  ownProgress: 0,
  partOfCollections: [
    "release/pentatonix-the-lucky-ones-deluxe",
    "release/pentatonix-the-lucky-ones-2",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Coffee In Bed",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "coffeeinbed|26AHtbjWKiwYzsoGoUZq53|195480",
  song: "song/pentatonix-coffee-in-bed",
  carriedBy: [
    {
      release: "release/pentatonix-the-lucky-ones-2",
      discNumber: 1,
      position: 3,
      externalId: "2AI3ZqvfHy3hTvdM9oRMYs",
      externalLink: "https://open.spotify.com/track/2AI3ZqvfHy3hTvdM9oRMYs",
    },
    {
      release: "release/pentatonix-the-lucky-ones-deluxe",
      discNumber: 1,
      position: 3,
      externalId: "2PsNntR2b5TQfGAwJwgfbi",
      externalLink: "https://open.spotify.com/track/2PsNntR2b5TQfGAwJwgfbi",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
