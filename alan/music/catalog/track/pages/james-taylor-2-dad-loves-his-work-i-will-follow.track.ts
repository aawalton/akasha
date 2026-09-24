import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkIWillFollow = {
  id: "01a0abeb-439a-7dca-8ba2-f70b672dcced",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-i-will-follow",
  ownLength: 4.296666666666667,
  ownProgress: 4.296666666666667,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Will Follow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "iwillfollow|0vn7UBvSQECKJm2817Yf1P|257800",
  song: "song/james-taylor-i-will-follow",
  carriedBy: [
    {
      release: "release/james-taylor-2-dad-loves-his-work",
      discNumber: 1,
      position: 4,
      externalId: "1rI0BuLl8r5mYBYHA0XAMW",
      externalLink: "https://open.spotify.com/track/1rI0BuLl8r5mYBYHA0XAMW",
    },
  ],
} as const satisfies Track
