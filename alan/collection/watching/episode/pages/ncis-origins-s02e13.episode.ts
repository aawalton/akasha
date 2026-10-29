import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisOriginsS02e13 = {
  id: "01a1884b-534a-7da0-b18e-afbf08ba7438",
  type: "page-type/episode",
  slug: "ncis-origins-s02e13",
  description:
    'When Dr. Tango is arrested for stealing human remains from a national park, Dr. Donald "Ducky" Mallard returns to assist the team in proving his innocence.',
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-origins-season-2"],
  position: 13,
  publishedAt: "2026-03-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7017154",
      externalLink: "https://www.themoviedb.org/tv/243006/season/2/episode/13",
    },
  ],
  title: "Homeward Bound",
  episodeType: "standard",
  stillPath: "/jFhQlwv6nRgom5CNX1dk8dIodG1.jpg",
  voteAverage: 10,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Episode
