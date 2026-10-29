import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e07 = {
  id: "01a18853-f9b0-778c-9c9b-b8b7262c42d0",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e07",
  description:
    "When Kaz and team arrives on a mysterious planet to buy supplies, they find the outpost has been abandoned and a secret Sith Temple has been raised.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 7,
  publishedAt: "2019-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1968332",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/7",
    },
  ],
  title: "The Relic Raiders",
  episodeType: "standard",
  stillPath: "/tyeCO7OUhwfmtwb9IUXFH3jUYAe.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
