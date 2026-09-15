import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallChillCollection = {
  id: "01a0676a-d71a-702c-b00c-d1505268183a",
  type: "release",
  slug: "paul-cardall-chill-collection",
  title: "Chill Collection",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 62.52745,
  ownProgress: 62.52745,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-05-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Hnv3cvHjvxjr0w0VIJp5S",
      externalLink: "https://open.spotify.com/album/1Hnv3cvHjvxjr0w0VIJp5S",
    },
  ],
} as const satisfies Release
