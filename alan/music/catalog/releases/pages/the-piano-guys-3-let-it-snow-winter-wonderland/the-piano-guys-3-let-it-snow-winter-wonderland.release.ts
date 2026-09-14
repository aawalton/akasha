import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const thePianoGuys3LetItSnowWinterWonderland = {
  id: "01a0676a-d723-700b-ad9f-245122c2ecdc",
  type: "release",
  slug: "the-piano-guys-3-let-it-snow-winter-wonderland",
  title: "Let It Snow / Winter Wonderland",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 3.403833,
  ownProgress: 3.403833,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-12-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fp9hFtrXdaUuLLzjwN311",
      externalLink: "https://open.spotify.com/album/2fp9hFtrXdaUuLLzjwN311",
    },
  ],
} as const satisfies Release
