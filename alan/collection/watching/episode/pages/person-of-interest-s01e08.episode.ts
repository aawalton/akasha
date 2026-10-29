import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e08 = {
  id: "01a18851-3df3-78ce-92f5-87a83c792369",
  type: "page-type/episode",
  slug: "person-of-interest-s01e08",
  description:
    "When Reese and Finch discover that their latest POI has connections to Cold War Soviet espionage circles, they quickly learn how covert ops were handled in a world before The Machine.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 8,
  publishedAt: "2011-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64062",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/8",
    },
  ],
  title: "Foe",
  episodeType: "standard",
  stillPath: "/eA9MsEf7rcNuLpSof3kEUCD9ir8.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
