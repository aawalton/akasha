import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const bananaFishSeason1 = {
  id: "01a183dd-ecbb-74f0-80aa-d4d48095df3c",
  type: "page-type/season",
  slug: "banana-fish-season-1",
  description:
    "A teenaged gang leader in New York City faces his abuser and rival gangs alongside a photojournalist from Japan as they investigate a deadly new drug.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/banana-fish"],
  position: 1,
  publishedAt: "2018-07-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "105822",
      externalLink: "https://www.themoviedb.org/tv/80564/season/1",
    },
  ],
  title: "Banana Fish Season 1",
  posterPath: "/4DCpdR7qbnh64BOKGjQ5JmFQkds.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:55:21.786Z",
  updatedAt: "2026-10-28T18:55:21.786Z",
} as const satisfies Season
