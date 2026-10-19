import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixHappyNowHappyNow = {
  id: "01a1546f-24f8-7b71-a42f-76cd1b3e48db",
  type: "page-type/track",
  slug: "pentatonix-happy-now-happy-now",
  ownLength: 3.435583333333333,
  ownProgress: 3.435583333333333,
  partOfCollections: ["release/pentatonix-happy-now"],
  status: "completed",
  unit: "unit/minutes",
  title: "Happy Now",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "happynow|26AHtbjWKiwYzsoGoUZq53|206135",
  song: "song/pentatonix-happy-now",
  carriedBy: [
    {
      release: "release/pentatonix-happy-now",
      discNumber: 1,
      position: 1,
      externalId: "4LDuSfbXupGKg6RpkgTAij",
      externalLink: "https://open.spotify.com/track/4LDuSfbXupGKg6RpkgTAij",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
