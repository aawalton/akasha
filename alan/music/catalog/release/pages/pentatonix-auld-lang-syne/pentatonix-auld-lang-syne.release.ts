import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixAuldLangSyne = {
  id: "01a0676a-d717-7040-b704-fa50c06c6ba0",
  type: "page-type/release",
  slug: "pentatonix-auld-lang-syne",
  title: "Auld Lang Syne",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-12-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2yrwigFwQa08Ty6HCovWqC",
      externalLink: "https://open.spotify.com/album/2yrwigFwQa08Ty6HCovWqC",
    },
  ],
  createdAt: "2026-09-03T13:17:30.263Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
