import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkLondonTown = {
  id: "01a0abeb-4445-78b6-824b-c2297a0199f2",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-london-town",
  ownLength: 3.8988833333333335,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1SPNhTQgsFuw6UavXrPcJS",
      externalLink: "https://open.spotify.com/track/1SPNhTQgsFuw6UavXrPcJS",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "London Town",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "londontown|0vn7UBvSQECKJm2817Yf1P|233933",
  song: "song/james-taylor-london-town",
} as const satisfies Track
