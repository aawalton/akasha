import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS01e06 = {
  id: "01a18849-3527-799c-a32d-e6da43d4d9ed",
  type: "page-type/episode",
  slug: "good-witch-s01e06",
  description:
    "Cassie tries to convince Sam to follow her intuition in order to help a young couple survive a blizzard.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-1"],
  position: 6,
  publishedAt: "2015-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1049328",
      externalLink: "https://www.themoviedb.org/tv/61864/season/1/episode/6",
    },
  ],
  title: "The Storm",
  episodeType: "standard",
  stillPath: "/1gY1RucwUrcSgQwzyfgXpMmO6kn.jpg",
  voteAverage: 6.583,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
