import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterAlienDarkHeartRemix = {
  id: "01a0676a-d716-7013-aa60-05512b58ba04",
  type: "page-type/release",
  slug: "sabrina-carpenter-alien-dark-heart-remix",
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
      externalId: "4mswsu3o2Bt2vYkXK9nKtC",
      externalLink: "https://open.spotify.com/album/4mswsu3o2Bt2vYkXK9nKtC",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Alien (Dark Heart Remix)",
} as const satisfies Release
