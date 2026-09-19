import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlTalkAboutLoveFeatYoungThug = {
  id: "01a0aa7c-3045-7a40-84fa-1a7208125863",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-talk-about-love-feat-young-thug",
  ownLength: 3.3295666666666666,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5UkMXb3IfK9fTCCrMr0v9A",
      externalLink: "https://open.spotify.com/track/5UkMXb3IfK9fTCCrMr0v9A",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Talk About Love (feat. Young Thug)",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "50co4Is1HCEo8bhOyUWKpn", artistName: "Young Thug" },
  ],
  trackKey: "talkaboutlovefeatyoungthug|1Xylc3o4UrD53lo9CvFvVg,50co4Is1HCEo8bhOyUWKpn|199774",
  song: "song/zara-larsson-talk-about-love",
} as const satisfies Track
