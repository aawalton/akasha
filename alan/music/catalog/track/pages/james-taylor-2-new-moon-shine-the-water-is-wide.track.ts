import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineTheWaterIsWide = {
  id: "01a0abeb-4076-7985-a5b2-68e052d9b930",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-the-water-is-wide",
  ownLength: 3.013333333333333,
  ownProgress: 3.013333333333333,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Water Is Wide",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "thewateriswide|0vn7UBvSQECKJm2817Yf1P|180800",
  song: "song/james-taylor-the-water-is-wide",
  carriedBy: [
    {
      release: "release/james-taylor-2-new-moon-shine",
      discNumber: 1,
      position: 12,
      externalId: "6NaQl05UuL6ZHw6ptdyhdE",
      externalLink: "https://open.spotify.com/track/6NaQl05UuL6ZHw6ptdyhdE",
    },
  ],
} as const satisfies Track
