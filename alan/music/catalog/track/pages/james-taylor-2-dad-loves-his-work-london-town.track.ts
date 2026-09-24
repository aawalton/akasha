import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkLondonTown = {
  id: "01a0abeb-4445-78b6-824b-c2297a0199f2",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-london-town",
  ownLength: 3.8988833333333335,
  ownProgress: 3.8988833333333335,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  status: "completed",
  unit: "unit/minutes",
  title: "London Town",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "londontown|0vn7UBvSQECKJm2817Yf1P|233933",
  song: "song/james-taylor-london-town",
  carriedBy: [
    {
      release: "release/james-taylor-2-dad-loves-his-work",
      discNumber: 1,
      position: 10,
      externalId: "1SPNhTQgsFuw6UavXrPcJS",
      externalLink: "https://open.spotify.com/track/1SPNhTQgsFuw6UavXrPcJS",
    },
  ],
} as const satisfies Track
