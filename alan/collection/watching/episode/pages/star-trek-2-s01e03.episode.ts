import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e03 = {
  id: "01a1887f-e185-712f-a6e6-1d8668c044c6",
  type: "page-type/episode",
  slug: "star-trek-2-s01e03",
  description:
    "When Enterprise encounters a Force Field at the edge of the Galaxy, one of the crew members psionic abilities are accelerated to God like proportions causing him to become a powerful murderous being.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-1"],
  position: 3,
  publishedAt: "1966-09-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13956",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/3",
    },
  ],
  title: "Where No Man Has Gone Before",
  episodeType: "standard",
  stillPath: "/lTCzsIDyf9lNAySFZe2A2ktfH4L.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
