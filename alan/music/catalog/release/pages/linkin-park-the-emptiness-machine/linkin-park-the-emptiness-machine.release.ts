import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkTheEmptinessMachine = {
  id: "01a0676a-d72d-7004-901d-fd2f364f0000",
  type: "page-type/release",
  slug: "linkin-park-the-emptiness-machine",
  title: "The Emptiness Machine",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 3.173783,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-09-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6W0Gabv5f3ugnckc6YgfJQ",
      externalLink: "https://open.spotify.com/album/6W0Gabv5f3ugnckc6YgfJQ",
    },
  ],
} as const satisfies Release
