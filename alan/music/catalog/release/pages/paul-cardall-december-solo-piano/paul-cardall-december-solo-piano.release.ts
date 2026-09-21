import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallDecemberSoloPiano = {
  id: "01a0676a-d71c-7001-9720-a27429b8e6da",
  type: "page-type/release",
  slug: "paul-cardall-december-solo-piano",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2021-12-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4boPIzJql47Sb06GqNxHn9",
      externalLink: "https://open.spotify.com/album/4boPIzJql47Sb06GqNxHn9",
    },
  ],
  title: "December (Solo Piano)",
} as const satisfies Release
