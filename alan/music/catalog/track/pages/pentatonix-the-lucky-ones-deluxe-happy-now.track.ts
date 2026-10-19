import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixTheLuckyOnesDeluxeHappyNow = {
  id: "01a1546f-2500-7d0d-8868-0580946f58b8",
  type: "page-type/track",
  slug: "pentatonix-the-lucky-ones-deluxe-happy-now",
  ownLength: 3.444,
  ownProgress: 3.444,
  partOfCollections: ["release/pentatonix-the-lucky-ones-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Happy Now",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "happynow|26AHtbjWKiwYzsoGoUZq53|206640",
  song: "song/pentatonix-happy-now",
  carriedBy: [
    {
      release: "release/pentatonix-the-lucky-ones-deluxe",
      discNumber: 1,
      position: 1,
      externalId: "1K3lwszlI58LoxtafiUFD1",
      externalLink: "https://open.spotify.com/track/1K3lwszlI58LoxtafiUFD1",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
