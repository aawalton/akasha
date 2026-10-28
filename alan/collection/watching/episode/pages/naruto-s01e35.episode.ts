import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e35 = {
  id: "01a183d1-bb4d-745e-a50d-e0e18486dabf",
  type: "page-type/episode",
  slug: "naruto-s01e35",
  description:
    "To heal their wounds, Naruto and his team take a much-needed rest after their battle against the Sound ninja. But it has already been four days since the start of the exam and there is only one day remaining until time expires.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 35,
  publishedAt: "2003-05-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908160",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/35",
    },
  ],
  title: "The Scroll's Secret: No Peeking Allowed",
  episodeType: "standard",
  stillPath: "/d8LGgOxvDIJgBpBIgypfOT0eJg5.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
