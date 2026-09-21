import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMyUniverseDavidGuettaRemix = {
  id: "01a0676a-d725-7039-b90f-792e7b8416a2",
  type: "page-type/release",
  slug: "coldplay-my-universe-david-guetta-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2021-10-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4LcW19D6W1nHpvcJV5s2QI",
      externalLink: "https://open.spotify.com/album/4LcW19D6W1nHpvcJV5s2QI",
    },
  ],
  title: "My Universe (David Guetta Remix)",
} as const satisfies Release
