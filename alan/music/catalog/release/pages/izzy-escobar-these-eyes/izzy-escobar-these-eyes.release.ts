import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const izzyEscobarTheseEyes = {
  id: "01a0676a-d72e-7025-b287-f00169bd9aeb",
  type: "page-type/release",
  slug: "izzy-escobar-these-eyes",
  title: "These Eyes",
  partOfCollections: ["artist/izzy-escobar"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2025-03-07",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1MsSl8MsaCXLWwDXJQkzsr",
      externalLink: "https://open.spotify.com/album/1MsSl8MsaCXLWwDXJQkzsr",
      lastSyncedAt: "2025-11-15",
    },
  ],
  createdAt: "2026-09-03T13:17:30.286Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
