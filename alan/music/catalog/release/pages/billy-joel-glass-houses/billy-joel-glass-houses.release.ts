import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelGlassHouses = {
  id: "01a0676a-d71f-7002-8898-b6297c4b8602",
  type: "release",
  slug: "billy-joel-glass-houses",
  title: "Glass Houses",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 34.879083,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1980-03-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5sztejERqpktXEdemlUvU5",
      externalLink: "https://open.spotify.com/album/5sztejERqpktXEdemlUvU5",
    },
  ],
} as const satisfies Release
