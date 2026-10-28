import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kDaFirestarter = {
  id: "01a182c4-ef72-794c-9037-9d08317d8399",
  type: "page-type/release",
  slug: "k-da-firestarter",
  ownLength: 11.405766666666667,
  ownProgress: 0,
  partOfCollections: ["artist/k-da"],
  position: 0,
  publishedAt: "2026-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1trz2cTNpf94R6DdHciSbS",
      externalLink: "https://open.spotify.com/album/1trz2cTNpf94R6DdHciSbS",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "FIRESTARTER",
  createdAt: "2026-10-28T13:48:26.865Z",
  updatedAt: "2026-10-28T13:48:26.865Z",
} as const satisfies Release
