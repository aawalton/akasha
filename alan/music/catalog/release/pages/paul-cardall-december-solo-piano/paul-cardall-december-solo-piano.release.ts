import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallDecemberSoloPiano = {
  id: "01a0676a-d71c-7001-9720-a27429b8e6da",
  type: "page-type/release",
  slug: "paul-cardall-december-solo-piano",
  title: "December (Solo Piano)",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 45.757233,
  ownProgress: 45.757233,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-12-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4boPIzJql47Sb06GqNxHn9",
      externalLink: "https://open.spotify.com/album/4boPIzJql47Sb06GqNxHn9",
    },
  ],
} as const satisfies Release
