import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexWarrenOrdinaryOrdinary = {
  id: "01a0a59d-d044-7e82-ab1d-b02976c6d453",
  type: "page-type/track",
  slug: "alex-warren-ordinary-ordinary",
  ownLength: 3.1160666666666668,
  ownProgress: 0,
  partOfCollections: ["release/alex-warren-ordinary"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6qqrTXSdwiJaq8SO0X2lSe",
      externalLink: "https://open.spotify.com/track/6qqrTXSdwiJaq8SO0X2lSe",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Ordinary",
} as const satisfies Track
