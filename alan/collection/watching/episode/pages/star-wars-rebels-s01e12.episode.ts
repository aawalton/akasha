import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS01e12 = {
  id: "01a18853-ddfc-766b-a0d8-202465acc67b",
  type: "page-type/episode",
  slug: "star-wars-rebels-s01e12",
  description: "The team tries to get Kanan's location to free him.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-1"],
  position: 12,
  publishedAt: "2015-02-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1044679",
      externalLink: "https://www.themoviedb.org/tv/60554/season/1/episode/12",
    },
  ],
  title: "Rebel Resolve",
  episodeType: "standard",
  stillPath: "/5wsNsZU5Uy2RsVzySbGm7Ctjahu.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
