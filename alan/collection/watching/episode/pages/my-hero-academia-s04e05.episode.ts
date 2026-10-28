import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS04e05 = {
  id: "01a183d4-acc6-77f8-bf48-76101009b359",
  type: "page-type/episode",
  slug: "my-hero-academia-s04e05",
  description:
    "The U.A. work study students go out with their respective heroes and become involved in some big fights.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-4"],
  position: 5,
  publishedAt: "2019-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1958019",
      externalLink: "https://www.themoviedb.org/tv/65930/season/4/episode/5",
    },
  ],
  title: "Let’s Go, Gutsy Red Riot",
  episodeType: "standard",
  stillPath: "/6xSlj42kvFobud9Jj1Utj38X5ho.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
