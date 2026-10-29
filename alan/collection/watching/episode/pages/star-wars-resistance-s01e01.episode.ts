import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e01 = {
  id: "01a18853-f9ae-7a16-a673-a445f662034b",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e01",
  description:
    "X-wing pilot Kazuda Xiono is recruited for the Resistance, but finds himself in over his head when Poe Dameron assigns him to a remote fueling station to spy on the First Order. Then, after Kaz boasts about being the best pilot around, he is forced to compete in a dangerous sky race.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 1,
  publishedAt: "2018-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1552124",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/1",
    },
  ],
  title: "The Recruit",
  episodeType: "standard",
  stillPath: "/um5jMaqMxqvi75iAzaujIzTyH9V.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
