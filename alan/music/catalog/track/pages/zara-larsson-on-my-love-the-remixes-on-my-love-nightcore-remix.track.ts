import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonOnMyLoveTheRemixesOnMyLoveNightcoreRemix = {
  id: "01a0aa7c-2cc5-7bc3-943e-2878ae76badd",
  type: "page-type/track",
  slug: "zara-larsson-on-my-love-the-remixes-on-my-love-nightcore-remix",
  ownLength: 3.4675,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-on-my-love-the-remixes"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7oQEQf1ORmabztEv4kV6N0",
      externalLink: "https://open.spotify.com/track/7oQEQf1ORmabztEv4kV6N0",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "On My Love - Nightcore Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "1Cs0zKBU1kc0i8ypK3B9ai", artistName: "David Guetta" },
  ],
  trackKey: "onmylovenightcoreremix|1Cs0zKBU1kc0i8ypK3B9ai,1Xylc3o4UrD53lo9CvFvVg|208050",
  song: "song/zara-larsson-on-my-love",
} as const satisfies Track
