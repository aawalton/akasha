import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const mitskiLaurelHell = {
  id: "01a0676a-d722-7061-91fc-f73558473a10",
  type: "page-type/release",
  slug: "mitski-laurel-hell",
  title: "Laurel Hell",
  partOfCollections: ["artist/mitski"],
  position: 0,
  ownLength: 32.518417,
  ownProgress: 32.518417,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2022-02-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4rcinMUHEWOxpIwJo2sf22",
      externalLink: "https://open.spotify.com/album/4rcinMUHEWOxpIwJo2sf22",
    },
  ],
  createdAt: "2026-09-03T13:17:30.274Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
