import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioUnsaidDeluxe = {
  id: "01a0676a-d72f-7046-8f2d-683f8da8895e",
  type: "page-type/release",
  slug: "jessica-baio-unsaid-deluxe",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2025-05-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4SkkTkqPDk2oPTZxSrI6rf",
      externalLink: "https://open.spotify.com/album/4SkkTkqPDk2oPTZxSrI6rf",
    },
  ],
  title: "UNSAID (Deluxe)",
} as const satisfies Release
