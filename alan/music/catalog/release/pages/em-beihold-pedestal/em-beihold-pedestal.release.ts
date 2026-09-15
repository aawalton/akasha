import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdPedestal = {
  id: "01a0676a-d726-706a-8bbf-100004e11a77",
  type: "page-type/release",
  slug: "em-beihold-pedestal",
  title: "Pedestal",
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  ownLength: 3.192583,
  ownProgress: 3.192583,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2023-10-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5KRQkpYEeyfXX4gF9kWV7I",
      externalLink: "https://open.spotify.com/album/5KRQkpYEeyfXX4gF9kWV7I",
    },
  ],
} as const satisfies Release
