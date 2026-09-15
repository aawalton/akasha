import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaLiveFromSydneySoonWeLlBeFound = {
  id: "01a0a59c-0bb6-7b69-9e0f-3054920d6e21",
  type: "track",
  slug: "sia-live-from-sydney-soon-we-ll-be-found",
  ownLength: 4.234883333333333,
  ownProgress: 0,
  partOfCollections: ["release/sia-live-from-sydney"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7Kq2UdtXXqUAlVIpBzd9QY",
      externalLink: "https://open.spotify.com/track/7Kq2UdtXXqUAlVIpBzd9QY",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Soon We'll Be Found",
} as const satisfies Track
