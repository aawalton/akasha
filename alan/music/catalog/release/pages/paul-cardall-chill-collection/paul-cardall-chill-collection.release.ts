import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallChillCollection = {
  id: "01a0676a-d71a-702c-b00c-d1505268183a",
  type: "page-type/release",
  slug: "paul-cardall-chill-collection",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2010-05-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Hnv3cvHjvxjr0w0VIJp5S",
      externalLink: "https://open.spotify.com/album/1Hnv3cvHjvxjr0w0VIJp5S",
    },
  ],
  title: "Chill Collection",
} as const satisfies Release
