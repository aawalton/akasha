import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMidnightKygoRemixMidnightKygoRemix = {
  id: "01a0b9ee-f6e4-725a-98ba-d737190ee9f0",
  type: "page-type/track",
  slug: "coldplay-midnight-kygo-remix-midnight-kygo-remix",
  ownLength: 5.27245,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-midnight-kygo-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2CoWJhDYVENsByS7rPInSr",
      externalLink: "https://open.spotify.com/track/2CoWJhDYVENsByS7rPInSr",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Midnight - Kygo Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "23fqKkggKUBHNkbKtXEls4", artistName: "Kygo" },
  ],
  trackKey: "midnightkygoremix|23fqKkggKUBHNkbKtXEls4,4gzpq5DPGxSnKTe4SA8HAU|316347",
  song: "song/coldplay-midnight",
} as const satisfies Track
