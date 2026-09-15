import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberBeStill = {
  id: "01a0a5ae-ca29-78cb-9b04-b65753734cf5",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-be-still",
  ownLength: 3.402,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "55MtyKhso3SCzJLtDxnQKI",
      externalLink: "https://open.spotify.com/track/55MtyKhso3SCzJLtDxnQKI",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Be Still",
} as const satisfies Track
