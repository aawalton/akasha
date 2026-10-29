import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e01 = {
  id: "01a18857-c36c-7e5b-a522-195b145a4850",
  type: "page-type/episode",
  slug: "the-office-s07e01",
  description:
    "Michael refuses to fire the new office assistant after everyone complains about his bad attitude. Andy plays it cool after Erin shows interest in another man. Meanwhile, Pam tries to impress Jim by pulling an office prank of her own.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 1,
  publishedAt: "2010-09-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170266",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/1",
    },
  ],
  title: "Nepotism",
  episodeType: "standard",
  stillPath: "/pYQwCiNc9fFJ5k8HnSWgAstfnL0.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
