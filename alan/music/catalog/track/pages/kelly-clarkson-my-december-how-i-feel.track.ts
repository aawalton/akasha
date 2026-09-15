import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberHowIFeel = {
  id: "01a0a5ae-ca5f-7bec-b7d1-24510804d850",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-how-i-feel",
  ownLength: 3.6751,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7M990eDUgJeWXB0B4Us3Ai",
      externalLink: "https://open.spotify.com/track/7M990eDUgJeWXB0B4Us3Ai",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "How I Feel",
} as const satisfies Track
