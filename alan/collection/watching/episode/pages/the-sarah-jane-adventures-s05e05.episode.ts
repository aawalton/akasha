import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS05e05 = {
  id: "01a18858-1d5e-7e05-85a9-4a48a79d8f47",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s05e05",
  description:
    "Everyone wants the brand-new SerfBoard - and why not? What could be so dangerous about a computer?",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-5"],
  position: 5,
  publishedAt: "2011-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12039",
      externalLink: "https://www.themoviedb.org/tv/203/season/5/episode/5",
    },
  ],
  title: "The Man Who Never Was (1)",
  episodeType: "standard",
  stillPath: "/1sPuz9edoPCu1IM8UUctcTBAbFM.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
