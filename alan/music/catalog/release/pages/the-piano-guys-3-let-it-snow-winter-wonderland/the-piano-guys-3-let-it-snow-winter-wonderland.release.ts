import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3LetItSnowWinterWonderland = {
  id: "01a0676a-d723-700b-ad9f-245122c2ecdc",
  type: "page-type/release",
  slug: "the-piano-guys-3-let-it-snow-winter-wonderland",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2019-12-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fp9hFtrXdaUuLLzjwN311",
      externalLink: "https://open.spotify.com/album/2fp9hFtrXdaUuLLzjwN311",
    },
  ],
  title: "Let It Snow / Winter Wonderland",
} as const satisfies Release
