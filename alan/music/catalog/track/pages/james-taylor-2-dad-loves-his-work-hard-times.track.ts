import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkHardTimes = {
  id: "01a0abeb-4332-7c14-b479-35e06e387c75",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-hard-times",
  ownLength: 3.1904333333333335,
  ownProgress: 3.1904333333333335,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hard Times",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "hardtimes|0vn7UBvSQECKJm2817Yf1P|191426",
  song: "song/james-taylor-hard-times",
  carriedBy: [
    {
      release: "release/james-taylor-2-dad-loves-his-work",
      discNumber: 1,
      position: 1,
      externalId: "6jMNpRglqktDICL8HGfOBG",
      externalLink: "https://open.spotify.com/track/6jMNpRglqktDICL8HGfOBG",
    },
  ],
} as const satisfies Track
