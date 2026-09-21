import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdForgiveYourself = {
  id: "01a0676a-d71e-702d-b3cd-76f0838a9bdf",
  type: "page-type/release",
  slug: "em-beihold-forgive-yourself",
  title: "Forgive Yourself",
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  ownLength: 3.229033,
  ownProgress: 3.229033,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2020-05-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "06fOjW8EFww9Q5u610NIY3",
      externalLink: "https://open.spotify.com/album/06fOjW8EFww9Q5u610NIY3",
    },
  ],
} as const satisfies Release
