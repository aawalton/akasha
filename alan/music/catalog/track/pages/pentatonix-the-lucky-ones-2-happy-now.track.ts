import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixTheLuckyOnes2HappyNow = {
  id: "01a1546f-2500-7ced-8a43-e11192d119c0",
  type: "page-type/track",
  slug: "pentatonix-the-lucky-ones-2-happy-now",
  ownLength: 3.4440166666666667,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-the-lucky-ones-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Happy Now",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "happynow|26AHtbjWKiwYzsoGoUZq53|206641",
  song: "song/pentatonix-happy-now",
  carriedBy: [
    {
      release: "release/pentatonix-the-lucky-ones-2",
      discNumber: 1,
      position: 1,
      externalId: "5Iui9mLCtNnqsYubWI5VLc",
      externalLink: "https://open.spotify.com/track/5Iui9mLCtNnqsYubWI5VLc",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
