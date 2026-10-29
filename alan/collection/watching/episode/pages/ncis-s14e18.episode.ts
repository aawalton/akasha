import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e18 = {
  id: "01a1884b-ef75-7b82-a1be-c00a5bb4993f",
  type: "page-type/episode",
  slug: "ncis-s14e18",
  description:
    "To carry out a sailor's dying wish, Gibbs and the NCIS team reinvestigate a murder case that was originally ruled an accidental death.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 18,
  publishedAt: "2017-03-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1273037",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/18",
    },
  ],
  title: "M.I.A.",
  episodeType: "standard",
  stillPath: "/pUXe4jQdzCIcHDKLfhzW3utNDrc.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
