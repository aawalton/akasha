import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS03e01 = {
  id: "01a18857-c367-7596-8e30-0fef68320851",
  type: "page-type/episode",
  slug: "the-office-s03e01",
  description:
    "When Michael unintentionally outs a gay employee, he stumbles through a sensitivity mine-field. Also, we find out what happened with Jim and Pam.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-3"],
  position: 1,
  publishedAt: "2006-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170158",
      externalLink: "https://www.themoviedb.org/tv/2316/season/3/episode/1",
    },
  ],
  title: "Gay Witch Hunt",
  episodeType: "standard",
  stillPath: "/jl407zcuAwBoV886jbD5aQs3gsl.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
