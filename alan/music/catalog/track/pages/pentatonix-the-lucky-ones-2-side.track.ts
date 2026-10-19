import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixTheLuckyOnes2Side = {
  id: "01a1546f-2500-7177-a7d7-2166fde9a93b",
  type: "page-type/track",
  slug: "pentatonix-the-lucky-ones-2-side",
  ownLength: 3.4652,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-the-lucky-ones-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Side",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "side|26AHtbjWKiwYzsoGoUZq53|207912",
  song: "song/pentatonix-side",
  carriedBy: [
    {
      release: "release/pentatonix-the-lucky-ones-2",
      discNumber: 1,
      position: 6,
      externalId: "4gs5Xv10fgdkSO9Jrjq0rk",
      externalLink: "https://open.spotify.com/track/4gs5Xv10fgdkSO9Jrjq0rk",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
