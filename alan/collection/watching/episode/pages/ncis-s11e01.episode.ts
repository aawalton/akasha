import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e01 = {
  id: "01a1884b-ef70-7043-96ea-4a4a77fd2c09",
  type: "page-type/episode",
  slug: "ncis-s11e01",
  description:
    "An explosion at a D.C. event that results in a casualty connected to the agency changes Parsons’ perspective on Gibbs and the NCIS team.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 1,
  publishedAt: "2013-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334696",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/1",
    },
  ],
  title: "Whiskey Tango Foxtrot",
  episodeType: "standard",
  stillPath: "/tf6PZi2Dw2mg00IL2h6RRJWwrjf.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
