import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineTheFrozenMan = {
  id: "01a0abeb-3fb2-7743-ac1c-481501be38cd",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-the-frozen-man",
  ownLength: 3.904,
  ownProgress: 3.904,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Frozen Man",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "thefrozenman|0vn7UBvSQECKJm2817Yf1P|234240",
  song: "song/james-taylor-the-frozen-man",
  carriedBy: [
    {
      release: "release/james-taylor-2-new-moon-shine",
      discNumber: 1,
      position: 5,
      externalId: "1eh6QSEBkWZSVTt6HT7wDU",
      externalLink: "https://open.spotify.com/track/1eh6QSEBkWZSVTt6HT7wDU",
    },
  ],
} as const satisfies Track
