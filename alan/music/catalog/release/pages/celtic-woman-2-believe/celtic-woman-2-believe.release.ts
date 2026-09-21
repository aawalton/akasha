import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2Believe = {
  id: "01a0676a-d718-7038-bb28-12055173e95c",
  type: "page-type/release",
  slug: "celtic-woman-2-believe",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2012-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0W3Iy4fSoo52orS48lB62N",
      externalLink: "https://open.spotify.com/album/0W3Iy4fSoo52orS48lB62N",
    },
  ],
  title: "Believe",
} as const satisfies Release
