import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS03e02 = {
  id: "01a18857-c367-7092-a7ce-c3d5298695a1",
  type: "page-type/episode",
  slug: "the-office-s03e02",
  description:
    "Kelly set Pam up on her first date since breaking up with Roy. She was very nervous. Michael tried giving her dating tips and told her she should freak her date out by wearing her wedding dress.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-3"],
  position: 2,
  publishedAt: "2006-09-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170160",
      externalLink: "https://www.themoviedb.org/tv/2316/season/3/episode/2",
    },
  ],
  title: "The Convention",
  episodeType: "standard",
  stillPath: "/4S8RVY7MNkC8HwGfDr8tijsVOZp.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
