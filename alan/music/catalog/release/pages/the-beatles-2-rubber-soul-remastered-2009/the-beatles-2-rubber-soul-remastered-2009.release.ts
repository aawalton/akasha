import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theBeatles2RubberSoulRemastered2009 = {
  id: "01a0676a-d728-7026-a051-8515305a9781",
  type: "page-type/release",
  slug: "the-beatles-2-rubber-soul-remastered-2009",
  title: "Rubber Soul (Remastered 2009)",
  partOfCollections: ["artist/the-beatles"],
  position: 0,
  ownLength: 35.538817,
  ownProgress: 35.538817,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1965-12-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "50o7kf2wLwVmOTVYJOTplm",
      externalLink: "https://open.spotify.com/album/50o7kf2wLwVmOTVYJOTplm",
    },
  ],
} as const satisfies Release
