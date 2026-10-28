import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS03e04 = {
  id: "01a183d4-acc4-70b6-928a-506c331c8577",
  type: "page-type/episode",
  slug: "my-hero-academia-s03e04",
  description:
    "The villains launch their attack, and only Izuku knows where Kota is. Can he get to him in time?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-3"],
  position: 4,
  publishedAt: "2018-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1448437",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3/episode/4",
    },
  ],
  title: "My Hero",
  episodeType: "standard",
  stillPath: "/fkAD0clQnyfYjfNrSr7jD2vFOMh.jpg",
  voteAverage: 9,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
