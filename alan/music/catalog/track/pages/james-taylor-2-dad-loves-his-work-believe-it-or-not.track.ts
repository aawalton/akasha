import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkBelieveItOrNot = {
  id: "01a0abeb-43bb-7f10-a94f-0356c00338bb",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-believe-it-or-not",
  ownLength: 3.82155,
  ownProgress: 3.82155,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  status: "completed",
  unit: "unit/minutes",
  title: "Believe It or Not",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "believeitornot|0vn7UBvSQECKJm2817Yf1P|229293",
  song: "song/james-taylor-believe-it-or-not",
  carriedBy: [
    {
      release: "release/james-taylor-2-dad-loves-his-work",
      discNumber: 1,
      position: 5,
      externalId: "6FYohC3fFYUqcsVZ2w7YeP",
      externalLink: "https://open.spotify.com/track/6FYohC3fFYUqcsVZ2w7YeP",
    },
  ],
} as const satisfies Track
