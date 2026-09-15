import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkFromZero = {
  id: "01a0676a-d71e-703e-a300-7ddd597fc1e0",
  type: "page-type/release",
  slug: "linkin-park-from-zero",
  title: "From Zero",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 31.975517,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-11-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4R6FV9NSzhPihHR0h4pI93",
      externalLink: "https://open.spotify.com/album/4R6FV9NSzhPihHR0h4pI93",
    },
  ],
} as const satisfies Release
