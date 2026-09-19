import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkIWillFollow = {
  id: "01a0abeb-439a-7dca-8ba2-f70b672dcced",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-i-will-follow",
  ownLength: 4.296666666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1rI0BuLl8r5mYBYHA0XAMW",
      externalLink: "https://open.spotify.com/track/1rI0BuLl8r5mYBYHA0XAMW",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "I Will Follow",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "iwillfollow|0vn7UBvSQECKJm2817Yf1P|257800",
  song: "song/james-taylor-i-will-follow",
} as const satisfies Track
