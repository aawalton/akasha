import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberNeverAgain = {
  id: "01a0a5ae-c96a-7326-bb73-65b31af59777",
  type: "track",
  slug: "kelly-clarkson-my-december-never-again",
  ownLength: 3.62155,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "24y3tSyLdRbpVsKhQrR2oj",
      externalLink: "https://open.spotify.com/track/24y3tSyLdRbpVsKhQrR2oj",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Never Again",
} as const satisfies Track
