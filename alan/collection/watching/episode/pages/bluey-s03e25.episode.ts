import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e25 = {
  id: "01a18843-d154-7fe4-b662-71a674ddb0d8",
  type: "page-type/episode",
  slug: "bluey-s03e25",
  description:
    "Dad agrees to take Bluey and Bingo to the shops to buy an ice-cream if they can get him into the car. Only problem is... he's just entered 'Ragdoll' mode!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 25,
  publishedAt: "2021-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3381144",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/25",
    },
  ],
  title: "Ragdoll",
  episodeType: "standard",
  stillPath: "/rWUNXgQ1zHB5U8mJF0RvhP290ft.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
