import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixTheLuckyOnesDeluxeLoveMeWhenIDont = {
  id: "01a1546f-2500-7b76-a416-ecb18d7aa124",
  type: "page-type/track",
  slug: "pentatonix-the-lucky-ones-deluxe-love-me-when-i-dont",
  ownLength: 3.3404333333333334,
  ownProgress: 0,
  partOfCollections: [
    "release/pentatonix-the-lucky-ones-deluxe",
    "release/pentatonix-the-lucky-ones-2",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Love Me When I Don't",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "lovemewhenidont|26AHtbjWKiwYzsoGoUZq53|200426",
  song: "song/pentatonix-love-me-when-i-dont",
  carriedBy: [
    {
      release: "release/pentatonix-the-lucky-ones-2",
      discNumber: 1,
      position: 2,
      externalId: "3dJaRHcUgxBfN22vImbQ04",
      externalLink: "https://open.spotify.com/track/3dJaRHcUgxBfN22vImbQ04",
    },
    {
      release: "release/pentatonix-the-lucky-ones-deluxe",
      discNumber: 1,
      position: 2,
      externalId: "1NmnCkyCTj2xWYQ154RGFc",
      externalLink: "https://open.spotify.com/track/1NmnCkyCTj2xWYQ154RGFc",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
