import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonTheAmbitionGirlsTrip = {
  id: "01a0aa7c-24fb-767c-8aa9-0ab4b6adc93f",
  type: "page-type/release",
  slug: "zara-larsson-the-ambition-girls-trip",
  ownLength: 3.2587166666666665,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2026-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1X8txt3aCaYTS3Je4UheBT",
      externalLink: "https://open.spotify.com/album/1X8txt3aCaYTS3Je4UheBT",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Ambition (Girls Trip)",
} as const satisfies Release
