import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixTheLuckyOnesDeluxeBored = {
  id: "01a1546f-2500-7ef8-aff5-2dc0503f045d",
  type: "page-type/track",
  slug: "pentatonix-the-lucky-ones-deluxe-bored",
  ownLength: 2.7953333333333332,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-the-lucky-ones-deluxe"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bored",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "bored|26AHtbjWKiwYzsoGoUZq53|167720",
  song: "song/pentatonix-bored",
  carriedBy: [
    {
      release: "release/pentatonix-the-lucky-ones-deluxe",
      discNumber: 1,
      position: 7,
      externalId: "2jeWEjolVzlymcg6forVCX",
      externalLink: "https://open.spotify.com/track/2jeWEjolVzlymcg6forVCX",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
