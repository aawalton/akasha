import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraSomewhereElseSaluteRemix = {
  id: "01a0b637-ea78-7267-8b14-19e27711918c",
  type: "page-type/release",
  slug: "aurora-somewhere-else-salute-remix",
  ownLength: 6.044983333333334,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2026-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "08GmfI57v2yujtjXL94x7R",
      externalLink: "https://open.spotify.com/album/08GmfI57v2yujtjXL94x7R",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "SOMEWHERE ELSE (salute Remix)",
} as const satisfies Release
