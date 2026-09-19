import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonOnMyLoveTheRemixesOnMyLoveExtendedVersion = {
  id: "01a0aa7c-2c7f-7bee-b5ad-13b45c582813",
  type: "page-type/track",
  slug: "zara-larsson-on-my-love-the-remixes-on-my-love-extended-version",
  ownLength: 4.780483333333334,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-on-my-love-the-remixes"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4qQw9mgj14HXVptDCFQUUH",
      externalLink: "https://open.spotify.com/track/4qQw9mgj14HXVptDCFQUUH",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "On My Love - Extended Version",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "1Cs0zKBU1kc0i8ypK3B9ai", artistName: "David Guetta" },
  ],
  trackKey: "onmyloveextendedversion|1Cs0zKBU1kc0i8ypK3B9ai,1Xylc3o4UrD53lo9CvFvVg|286829",
  song: "song/zara-larsson-on-my-love",
} as const satisfies Track
