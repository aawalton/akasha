import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const mitskiLaurelHell = {
  id: "01a0676a-d722-7061-91fc-f73558473a10",
  type: "release",
  slug: "mitski-laurel-hell",
  title: "Laurel Hell",
  partOfCollections: ["artist/mitski"],
  position: 0,
  ownLength: 32.518417,
  ownProgress: 32.518417,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "2022-02-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4rcinMUHEWOxpIwJo2sf22",
      externalLink: "https://open.spotify.com/album/4rcinMUHEWOxpIwJo2sf22",
    },
  ],
} as const satisfies Release
