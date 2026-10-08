import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const snailMailEasyThing = {
  id: "01a0676a-d71c-704e-a09f-6c7c04b70764",
  type: "page-type/release",
  slug: "snail-mail-easy-thing",
  title: "Easy Thing",
  partOfCollections: ["artist/snail-mail"],
  position: 0,
  ownLength: 2.718217,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-09-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1IMObMG6eLRwu6ZVTkACWa",
      externalLink: "https://open.spotify.com/album/1IMObMG6eLRwu6ZVTkACWa",
    },
  ],
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-09-15T16:39:19.000Z",
} as const satisfies Release
