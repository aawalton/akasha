import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdHotGoblin = {
  id: "01a0676a-d720-7060-9007-602f2dc69cd5",
  type: "page-type/release",
  slug: "em-beihold-hot-goblin",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2025-09-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ehPg84etRc980Up4eqY93",
      externalLink: "https://open.spotify.com/album/3ehPg84etRc980Up4eqY93",
    },
  ],
  title: "Hot Goblin",
} as const satisfies Release
