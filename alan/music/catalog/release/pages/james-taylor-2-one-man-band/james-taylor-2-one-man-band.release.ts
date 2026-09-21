import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2OneManBand = {
  id: "01a0676a-d726-702c-8faa-4c9c2123096c",
  type: "page-type/release",
  slug: "james-taylor-2-one-man-band",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "2007-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0C8IHwZUTmSGcFTeakuZNG",
      externalLink: "https://open.spotify.com/album/0C8IHwZUTmSGcFTeakuZNG",
    },
  ],
  title: "One Man Band",
} as const satisfies Release
