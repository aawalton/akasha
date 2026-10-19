import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixTheLuckyOnes2Bored = {
  id: "01a1546f-24ff-727b-adcb-a79fa34023b0",
  type: "page-type/track",
  slug: "pentatonix-the-lucky-ones-2-bored",
  ownLength: 2.7952333333333335,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-the-lucky-ones-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bored",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "bored|26AHtbjWKiwYzsoGoUZq53|167714",
  song: "song/pentatonix-bored",
  carriedBy: [
    {
      release: "release/pentatonix-the-lucky-ones-2",
      discNumber: 1,
      position: 7,
      externalId: "3iOvJytAbKzIvvm3oAy0KD",
      externalLink: "https://open.spotify.com/track/3iOvJytAbKzIvvm3oAy0KD",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
