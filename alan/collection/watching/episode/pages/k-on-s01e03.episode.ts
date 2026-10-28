import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS01e03 = {
  id: "01a183da-4478-7692-a2cb-1b26a8a1ace1",
  type: "page-type/episode",
  slug: "k-on-s01e03",
  description:
    "It’s time to take midterm exams, but Yui is too busy practicing guitar that she ends up failing. She must pass the retest or the band must breakup.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-1"],
  position: 3,
  publishedAt: "2009-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879077",
      externalLink: "https://www.themoviedb.org/tv/42253/season/1/episode/3",
    },
  ],
  title: "Cram Session!",
  episodeType: "standard",
  stillPath: "/wI1UUNcyKxA29raIdIsPlAkDoY1.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
