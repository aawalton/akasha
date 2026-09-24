import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkSummersHere = {
  id: "01a0abeb-440f-71f9-8e52-295b165e0121",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-summers-here",
  ownLength: 2.71555,
  ownProgress: 2.71555,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  status: "completed",
  unit: "unit/minutes",
  title: "Summer's Here",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "summershere|0vn7UBvSQECKJm2817Yf1P|162933",
  song: "song/james-taylor-summers-here",
  carriedBy: [
    {
      release: "release/james-taylor-2-dad-loves-his-work",
      discNumber: 1,
      position: 8,
      externalId: "1kgoMTV6BJlCYzTR9lOxCy",
      externalLink: "https://open.spotify.com/track/1kgoMTV6BJlCYzTR9lOxCy",
    },
  ],
} as const satisfies Track
