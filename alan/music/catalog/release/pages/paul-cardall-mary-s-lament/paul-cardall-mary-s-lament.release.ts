import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallMarySLament = {
  id: "01a0676a-d724-7039-9148-e6b502f1eaec",
  type: "page-type/release",
  slug: "paul-cardall-mary-s-lament",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2024-08-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0FaoSeFZuGesNhvWf4fewI",
      externalLink: "https://open.spotify.com/album/0FaoSeFZuGesNhvWf4fewI",
    },
  ],
  title: "Mary's Lament",
} as const satisfies Release
