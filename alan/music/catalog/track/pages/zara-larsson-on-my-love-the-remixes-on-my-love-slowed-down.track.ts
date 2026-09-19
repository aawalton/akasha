import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonOnMyLoveTheRemixesOnMyLoveSlowedDown = {
  id: "01a0aa7c-2d11-7197-a7dd-4b3051a403b0",
  type: "page-type/track",
  slug: "zara-larsson-on-my-love-the-remixes-on-my-love-slowed-down",
  ownLength: 4.179583333333333,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-on-my-love-the-remixes"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1d3PCSldEkKjsTPtzRulGn",
      externalLink: "https://open.spotify.com/track/1d3PCSldEkKjsTPtzRulGn",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "On My Love - Slowed Down",
  trackType: "version",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "1Cs0zKBU1kc0i8ypK3B9ai", artistName: "David Guetta" },
  ],
  trackKey: "onmylovesloweddown|1Cs0zKBU1kc0i8ypK3B9ai,1Xylc3o4UrD53lo9CvFvVg|250775",
  song: "song/zara-larsson-on-my-love",
} as const satisfies Track
