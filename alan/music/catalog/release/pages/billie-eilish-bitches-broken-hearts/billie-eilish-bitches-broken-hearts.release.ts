import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishBitchesBrokenHearts = {
  id: "01a0676a-d719-700d-a544-70b983d614f5",
  type: "page-type/release",
  slug: "billie-eilish-bitches-broken-hearts",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2018-03-30",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Z0XtKcevvITZ5ydimkYcx",
      externalLink: "https://open.spotify.com/album/1Z0XtKcevvITZ5ydimkYcx",
    },
  ],
  title: "bitches broken hearts",
} as const satisfies Release
