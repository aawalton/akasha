import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixTheLuckyOnesDeluxePetals = {
  id: "01a1546f-2501-7224-952a-71d097c91b94",
  type: "page-type/track",
  slug: "pentatonix-the-lucky-ones-deluxe-petals",
  ownLength: 3.429333333333333,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-the-lucky-ones-deluxe"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Petals",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "petals|26AHtbjWKiwYzsoGoUZq53|205760",
  song: "song/pentatonix-petals",
  carriedBy: [
    {
      release: "release/pentatonix-the-lucky-ones-deluxe",
      discNumber: 1,
      position: 15,
      externalId: "5L4EuTSUxhUmhX4mScZKD5",
      externalLink: "https://open.spotify.com/track/5L4EuTSUxhUmhX4mScZKD5",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
