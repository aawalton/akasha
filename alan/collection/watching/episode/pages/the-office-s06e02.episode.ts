import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e02 = {
  id: "01a18857-c36b-7641-a613-88e8155c6c3e",
  type: "page-type/episode",
  slug: "the-office-s06e02",
  description:
    "Michael gets worried after a request from Jim, and Pam's busy with wedding planning. Darryl's worker's compensation claim makes Dwight suspicious.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 2,
  publishedAt: "2009-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170190",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/2",
    },
  ],
  title: "The Meeting",
  episodeType: "standard",
  stillPath: "/i6ShaUbd4F9sQqfKfs2zQuHXGmI.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
