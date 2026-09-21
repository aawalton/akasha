import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrande3435Remix = {
  id: "01a0676a-d715-7007-beab-b2fa6a57fe6b",
  type: "page-type/release",
  slug: "ariana-grande-34-35-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2021-01-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "11X2d5C6rFBFZZUOCJLPt9",
      externalLink: "https://open.spotify.com/album/11X2d5C6rFBFZZUOCJLPt9",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "34+35 (Remix)",
} as const satisfies Release
