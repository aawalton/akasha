import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioInferior = {
  id: "01a0c622-116e-7b7c-a270-2a26c70d2216",
  type: "page-type/release",
  slug: "jessica-baio-inferior",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2026-03-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4dQPWlfNuWE3xzvFb4XdVp",
      externalLink: "https://open.spotify.com/album/4dQPWlfNuWE3xzvFb4XdVp",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "inferior",
} as const satisfies Release
