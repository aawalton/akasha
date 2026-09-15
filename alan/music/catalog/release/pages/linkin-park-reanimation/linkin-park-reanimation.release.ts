import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkReanimation = {
  id: "01a0676a-d727-7051-ad3a-97a385550b94",
  type: "page-type/release",
  slug: "linkin-park-reanimation",
  title: "Reanimation",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 73.66855,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2002-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1MhedvSCTqGphXQz3oucpj",
      externalLink: "https://open.spotify.com/album/1MhedvSCTqGphXQz3oucpj",
    },
  ],
} as const satisfies Release
