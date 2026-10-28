import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e02 = {
  id: "01a183d1-bb4a-7921-be61-94ca43e15b06",
  type: "page-type/episode",
  slug: "naruto-s01e02",
  description:
    "Naruto finally graduates from the Ninja Academy and claims to know it all. Well, at least that what he tells Konohamaru, the Village elder's pint-size grandson. Much to the dismay of Ebisu, Konohamaru's teacher and mentor, Naruto teaches him the hormonally lethal \"Sexy Jutsu!\"",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 2,
  publishedAt: "2002-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1059122",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/2",
    },
  ],
  title: "My Name Is Konohamaru!",
  episodeType: "standard",
  stillPath: "/5e0sxZupgkWNRvEnSn8CtDaTNck.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
