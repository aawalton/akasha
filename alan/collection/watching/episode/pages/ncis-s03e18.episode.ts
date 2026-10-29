import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e18 = {
  id: "01a1884b-ef65-7c35-8b9c-faa970ef0206",
  type: "page-type/episode",
  slug: "ncis-s03e18",
  description:
    "The NCIS team must stop a teenage student from detonating a bomb attached to his body, while he's taking the other students hostage at a Quantico base high school. Gibbs tries to stop him when he enters the classroom, only to realize that there may be someone else controlling the teenage student from the outside.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 18,
  publishedAt: "2006-03-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334534",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/18",
    },
  ],
  title: "Bait",
  episodeType: "standard",
  stillPath: "/6llFhg9oPNLGSks57Ujst0LWd87.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
