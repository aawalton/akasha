import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkOnlyForMe = {
  id: "01a0abeb-43f3-7cce-bc49-bc2d7c3df320",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-only-for-me",
  ownLength: 4.91,
  ownProgress: 4.91,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  status: "completed",
  unit: "unit/minutes",
  title: "Only for Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "onlyforme|0vn7UBvSQECKJm2817Yf1P|294600",
  song: "song/james-taylor-only-for-me",
  carriedBy: [
    {
      release: "release/james-taylor-2-dad-loves-his-work",
      discNumber: 1,
      position: 7,
      externalId: "1TMZGTMNupwBrtltZErGlX",
      externalLink: "https://open.spotify.com/track/1TMZGTMNupwBrtltZErGlX",
    },
  ],
} as const satisfies Track
