import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS04e03 = {
  id: "01a1884b-301a-7bbc-83dc-6e6b6123f526",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s04e03",
  description:
    "Pride and his team join forces with FBI Director Isler when a Russian operative, who is in the U.S. to provide intelligence on sleeper agents, disappears after his Navy escort is murdered.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-4"],
  position: 3,
  publishedAt: "2017-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1367787",
      externalLink: "https://www.themoviedb.org/tv/61387/season/4/episode/3",
    },
  ],
  title: "The Asset",
  episodeType: "standard",
  stillPath: "/cAZzGa45y0B3qeq6RZLEny3ueRZ.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
