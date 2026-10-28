import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS04e01 = {
  id: "01a183d4-acc5-7368-96d6-6e6d342241b7",
  type: "page-type/episode",
  slug: "my-hero-academia-s04e01",
  description:
    "After All Might announces his retirement, freelance reporter Taneo Tokuda goes to the dorms to investigate U.A. Class 1-A.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-4"],
  position: 1,
  publishedAt: "2019-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1817667",
      externalLink: "https://www.themoviedb.org/tv/65930/season/4/episode/1",
    },
  ],
  title: "The Scoop on U.A. Class 1-A",
  episodeType: "standard",
  stillPath: "/dES7TRDGli7bNR1lT68STX9cf4m.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
