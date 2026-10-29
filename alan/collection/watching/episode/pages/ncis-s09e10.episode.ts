import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e10 = {
  id: "01a1884b-ef6e-7ad9-a127-b345f1e37b5e",
  type: "page-type/episode",
  slug: "ncis-s09e10",
  description:
    "After Anthony DiNozzo, Sr. is found in a car with a dead body in the trunk and no memory of the previous night, the NCIS team must figure out if he is capable of murder.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 10,
  publishedAt: "2011-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334600",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/10",
    },
  ],
  title: "Sins of the Father",
  episodeType: "standard",
  stillPath: "/qXeRT9nXR9uLxJSElEmW4GuHSti.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
