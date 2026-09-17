import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchi2016 = {
  id: "01a0b112-907f-75bf-932e-7503513e5afe",
  type: "page-type/release",
  slug: "vinny-marchi-2016",
  ownLength: 2.7021166666666665,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2026-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "15Th0OMA4suLMYYwDcuV2d",
      externalLink: "https://open.spotify.com/album/15Th0OMA4suLMYYwDcuV2d",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "2016",
} as const satisfies Release
