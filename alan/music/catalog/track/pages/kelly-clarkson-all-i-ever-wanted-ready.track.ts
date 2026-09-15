import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonAllIEverWantedReady = {
  id: "01a0a5ae-c8df-7588-be42-9357383326de",
  type: "page-type/track",
  slug: "kelly-clarkson-all-i-ever-wanted-ready",
  ownLength: 3.0657666666666668,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-all-i-ever-wanted"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6wOr3b3fPUoiUkvto1ab4q",
      externalLink: "https://open.spotify.com/track/6wOr3b3fPUoiUkvto1ab4q",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Ready",
} as const satisfies Track
