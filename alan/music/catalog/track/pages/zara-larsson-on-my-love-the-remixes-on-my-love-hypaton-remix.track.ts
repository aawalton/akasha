import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonOnMyLoveTheRemixesOnMyLoveHypatonRemix = {
  id: "01a0aa7c-2c17-7803-a6cf-4154249aea37",
  type: "page-type/track",
  slug: "zara-larsson-on-my-love-the-remixes-on-my-love-hypaton-remix",
  ownLength: 3.1875,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-on-my-love-the-remixes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2t5aPfRRi1vgQPPZ0r7LU2",
      externalLink: "https://open.spotify.com/track/2t5aPfRRi1vgQPPZ0r7LU2",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "On My Love - Hypaton Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "1Cs0zKBU1kc0i8ypK3B9ai", artistName: "David Guetta" },
    { externalId: "5GYaRwCWwhU6SIQrQ5G3b7", artistName: "Hypaton" },
  ],
  trackKey:
    "onmylovehypatonremix|1Cs0zKBU1kc0i8ypK3B9ai,1Xylc3o4UrD53lo9CvFvVg,5GYaRwCWwhU6SIQrQ5G3b7|191250",
  song: "song/zara-larsson-on-my-love",
} as const satisfies Track
