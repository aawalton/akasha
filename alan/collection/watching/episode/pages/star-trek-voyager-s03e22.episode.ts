import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e22 = {
  id: "01a18853-ac8d-7086-bd41-33c47723d1bb",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e22",
  description:
    "Stardate: 50863.2. The Doctor decides he should create a holographic family in order to expand himself. When B'Elanna is disgusted by its unrealistic perfectionism, she alters the program to include random events and outcomes with interesting and devastating results.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 22,
  publishedAt: "1997-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113152",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/22",
    },
  ],
  title: "Real Life",
  episodeType: "standard",
  stillPath: "/A3qmAR5vvnvJHuklxlO6huzxgG2.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
