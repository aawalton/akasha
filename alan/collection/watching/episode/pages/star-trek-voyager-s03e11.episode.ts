import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e11 = {
  id: "01a18853-ac8c-707f-a454-04ef94939497",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e11",
  description:
    "Stardate: 50384.2. Q begins courting Captain Janeway, claiming that her having his child is the only way to end a civil war wracking the Q Continuum.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 11,
  publishedAt: "1996-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113112",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/11",
    },
  ],
  title: "The Q and the Grey",
  episodeType: "standard",
  stillPath: "/84F7E5lKsvl9fmhZPV910yZndje.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
