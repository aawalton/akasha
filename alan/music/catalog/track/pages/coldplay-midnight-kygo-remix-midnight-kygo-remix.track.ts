import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMidnightKygoRemixMidnightKygoRemix = {
  id: "01a0b9ee-f6e4-725a-98ba-d737190ee9f0",
  type: "page-type/track",
  slug: "coldplay-midnight-kygo-remix-midnight-kygo-remix",
  ownLength: 5.27245,
  ownProgress: 5.27245,
  partOfCollections: ["release/coldplay-midnight-kygo-remix"],
  status: "completed",
  unit: "unit/minutes",
  title: "Midnight - Kygo Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "Kygo" }],
  trackKey: "midnightkygoremix|23fqKkggKUBHNkbKtXEls4,4gzpq5DPGxSnKTe4SA8HAU|316347",
  song: "song/coldplay-midnight",
  carriedBy: [
    {
      release: "release/coldplay-midnight-kygo-remix",
      discNumber: 1,
      position: 1,
      externalId: "2CoWJhDYVENsByS7rPInSr",
      externalLink: "https://open.spotify.com/track/2CoWJhDYVENsByS7rPInSr",
    },
  ],
} as const satisfies Track
