import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e17 = {
  id: "01a1884b-ef69-718f-b518-4c36e5199b97",
  type: "page-type/episode",
  slug: "ncis-s06e17",
  description:
    "When a fellow agent is murdered, the NCIS team head into the desert to locate a woman who might hold the answer to the mystery murder.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 17,
  publishedAt: "2009-02-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334421",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/17",
    },
  ],
  title: "South by Southwest",
  episodeType: "standard",
  stillPath: "/aNucTCDtFFuEo7cf1Be8zzvP9cZ.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
