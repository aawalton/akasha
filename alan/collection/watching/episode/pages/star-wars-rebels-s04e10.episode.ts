import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e10 = {
  id: "01a18853-ddff-728e-9e13-5f443fae04f7",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e10",
  description:
    "The Ghost Crew infiltrates the Imperial headquarters on Lothal to save one of their own.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 10,
  publishedAt: "2018-02-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1435272",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/10",
    },
  ],
  title: "Jedi Night",
  episodeType: "standard",
  stillPath: "/lnfO34uD6zG8AreL351Z2nyoTM0.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
