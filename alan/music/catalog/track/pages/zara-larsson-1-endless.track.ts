import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1Endless = {
  id: "01a0aa7c-3570-71ce-91cb-272bf0793f9b",
  type: "page-type/track",
  slug: "zara-larsson-1-endless",
  ownLength: 2.7791,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-1"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "381rMzk1u46CsMKmrlWoss",
      externalLink: "https://open.spotify.com/track/381rMzk1u46CsMKmrlWoss",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Endless",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "endless|1Xylc3o4UrD53lo9CvFvVg|166746",
} as const satisfies Track
