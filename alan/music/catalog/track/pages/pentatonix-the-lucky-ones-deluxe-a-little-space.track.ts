import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixTheLuckyOnesDeluxeALittleSpace = {
  id: "01a1546f-2500-7285-84d1-bf11e2af2ae4",
  type: "page-type/track",
  slug: "pentatonix-the-lucky-ones-deluxe-a-little-space",
  ownLength: 2.9011,
  ownProgress: 2.9011,
  partOfCollections: [
    "release/pentatonix-the-lucky-ones-deluxe",
    "release/pentatonix-the-lucky-ones-2",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "A Little Space",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "alittlespace|26AHtbjWKiwYzsoGoUZq53|174066",
  song: "song/pentatonix-a-little-space",
  carriedBy: [
    {
      release: "release/pentatonix-the-lucky-ones-2",
      discNumber: 1,
      position: 5,
      externalId: "5rocKPmOzouxizZqwhA3J1",
      externalLink: "https://open.spotify.com/track/5rocKPmOzouxizZqwhA3J1",
    },
    {
      release: "release/pentatonix-the-lucky-ones-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "39X9zgNjGbwTaWNkwuEuzf",
      externalLink: "https://open.spotify.com/track/39X9zgNjGbwTaWNkwuEuzf",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
