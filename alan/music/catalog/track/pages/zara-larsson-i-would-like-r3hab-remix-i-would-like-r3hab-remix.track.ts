import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonIWouldLikeR3habRemixIWouldLikeR3habRemix = {
  id: "01a0aa7c-4179-799d-8a8d-df72589876ca",
  type: "page-type/track",
  slug: "zara-larsson-i-would-like-r3hab-remix-i-would-like-r3hab-remix",
  ownLength: 2.4499833333333334,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-i-would-like-r3hab-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6gXTlkZQjtNo5j3Kp86H4G",
      externalLink: "https://open.spotify.com/track/6gXTlkZQjtNo5j3Kp86H4G",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "I Would Like - R3hab Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "6cEuCEZu7PAE9ZSzLLc2oQ", artistName: "R3HAB" },
  ],
  trackKey: "iwouldliker3habremix|1Xylc3o4UrD53lo9CvFvVg,6cEuCEZu7PAE9ZSzLLc2oQ|146999",
  song: "song/zara-larsson-i-would-like",
} as const satisfies Track
