import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungBabyBoomBaby = {
  id: "01a0abeb-40d4-7064-9d10-829823d5cf9c",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-baby-boom-baby",
  ownLength: 4.9971,
  ownProgress: 4.9971,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  status: "completed",
  unit: "unit/minutes",
  title: "Baby Boom Baby",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "babyboombaby|0vn7UBvSQECKJm2817Yf1P|299826",
  song: "song/james-taylor-baby-boom-baby",
  carriedBy: [
    {
      release: "release/james-taylor-2-never-die-young",
      discNumber: 1,
      position: 3,
      externalId: "4yl5qTyPSN3277wwzAA9Aq",
      externalLink: "https://open.spotify.com/track/4yl5qTyPSN3277wwzAA9Aq",
    },
  ],
} as const satisfies Track
