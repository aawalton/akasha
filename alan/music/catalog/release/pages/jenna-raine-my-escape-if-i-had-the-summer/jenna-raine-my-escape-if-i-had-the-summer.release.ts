import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineMyEscapeIfIHadTheSummer = {
  id: "01a0676a-d725-7025-ae81-669962af88e7",
  type: "page-type/release",
  slug: "jenna-raine-my-escape-if-i-had-the-summer",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2019-07-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4So4moCmxP8exCE75ZVZEE",
      externalLink: "https://open.spotify.com/album/4So4moCmxP8exCE75ZVZEE",
    },
  ],
  title: "My Escape / If I Had the Summer",
} as const satisfies Release
