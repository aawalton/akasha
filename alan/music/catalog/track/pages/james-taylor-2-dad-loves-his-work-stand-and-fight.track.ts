import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkStandAndFight = {
  id: "01a0abeb-43d7-7043-b62f-a44f82ea55ad",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-stand-and-fight",
  ownLength: 3.1726666666666667,
  ownProgress: 3.1726666666666667,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  status: "completed",
  unit: "unit/minutes",
  title: "Stand and Fight",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "standandfight|0vn7UBvSQECKJm2817Yf1P|190360",
  song: "song/james-taylor-stand-and-fight",
  carriedBy: [
    {
      release: "release/james-taylor-2-dad-loves-his-work",
      discNumber: 1,
      position: 6,
      externalId: "0hoLBsCWJzyFVLuDsCBHNp",
      externalLink: "https://open.spotify.com/track/0hoLBsCWJzyFVLuDsCBHNp",
    },
  ],
} as const satisfies Track
