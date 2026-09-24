import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassUpFromYourLife = {
  id: "01a0abeb-3b02-78fc-b946-f64b725b414f",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-up-from-your-life",
  ownLength: 5.246216666666666,
  ownProgress: 5.246216666666666,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Up From Your Life",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "upfromyourlife|0vn7UBvSQECKJm2817Yf1P|314773",
  song: "song/james-taylor-up-from-your-life",
  carriedBy: [
    {
      release: "release/james-taylor-2-hourglass",
      discNumber: 1,
      position: 9,
      externalId: "3McJMHQcLIxOhl4GFVOkKX",
      externalLink: "https://open.spotify.com/track/3McJMHQcLIxOhl4GFVOkKX",
    },
  ],
} as const satisfies Track
