import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e20 = {
  id: "01a18843-d154-71b2-99cd-93cf2b1ee3f7",
  type: "page-type/episode",
  slug: "bluey-s03e20",
  description:
    "With only five minutes to play 'Driving', Bluey and Mum race against the clock to buy milk for a grumpy guest and have to escape an angry shopkeeper.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 20,
  publishedAt: "2021-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3381139",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/20",
    },
  ],
  title: "Driving",
  episodeType: "standard",
  stillPath: "/zewn4S5ukzfWj9QioSrXAtMKs4C.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
