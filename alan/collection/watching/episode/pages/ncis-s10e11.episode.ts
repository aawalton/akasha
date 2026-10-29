import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e11 = {
  id: "01a1884b-ef6f-70f5-98f3-431c102152ff",
  type: "page-type/episode",
  slug: "ncis-s10e11",
  description:
    "While the NCIS team investigates the link between a dead journalist and a Petty Officer, Ziva is taken aback by the sudden emotional visit by her father, who she hasn't seen in more than two years.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 11,
  publishedAt: "2013-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334681",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/11",
    },
  ],
  title: "Shabbat Shalom",
  episodeType: "standard",
  stillPath: "/dfCI0h7LUnvF6tdC9KWu62kXbJU.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
