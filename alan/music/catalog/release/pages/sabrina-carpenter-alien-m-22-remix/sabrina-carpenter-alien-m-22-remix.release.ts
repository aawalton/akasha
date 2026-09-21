import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterAlienM22Remix = {
  id: "01a0676a-d716-7014-8fb4-f07597a7b43f",
  type: "page-type/release",
  slug: "sabrina-carpenter-alien-m-22-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2018-04-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0960lqbJIkGdYJ97UGY9My",
      externalLink: "https://open.spotify.com/album/0960lqbJIkGdYJ97UGY9My",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Alien (M-22 Remix)",
} as const satisfies Release
