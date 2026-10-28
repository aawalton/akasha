import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS04e03 = {
  id: "01a183d4-acc6-7243-a5b0-565b0370b7cd",
  type: "page-type/episode",
  slug: "my-hero-academia-s04e03",
  description:
    "Izuku battles Sir Nighteye so he can do his work study at Nighteye’s agency, but Nighteye has someone else in mind to be All Might’s successor…",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-4"],
  position: 3,
  publishedAt: "2019-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1817669",
      externalLink: "https://www.themoviedb.org/tv/65930/season/4/episode/3",
    },
  ],
  title: "Boy Meets…",
  episodeType: "standard",
  stillPath: "/jfV7JGoiY9m5vGminjhuE9gTYWM.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
