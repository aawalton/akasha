import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS05e03 = {
  id: "01a183d4-acc7-7454-89e3-812d8b971466",
  type: "page-type/episode",
  slug: "my-hero-academia-s05e03",
  description:
    "Class A and Class B are joined by a special guest as they battle it out during their joint combat training.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-5"],
  position: 3,
  publishedAt: "2021-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2817761",
      externalLink: "https://www.themoviedb.org/tv/65930/season/5/episode/3",
    },
  ],
  title: "Clash! Class A vs. Class B!",
  episodeType: "standard",
  stillPath: "/iyv4SjWGdAYU8vU1Cjn1vM7pa4V.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
