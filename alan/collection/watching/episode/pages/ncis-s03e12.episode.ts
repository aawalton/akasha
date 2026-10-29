import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e12 = {
  id: "01a1884b-ef65-70cb-9539-4f1f3d6d204a",
  type: "page-type/episode",
  slug: "ncis-s03e12",
  description:
    "While looking for smuggled weapons at a shipyard, Tony and Ziva disappear and it's up to NCIS to find them. Abby tries to find them by tracking down their GPS chips, but they seem to be out of reach.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 12,
  publishedAt: "2006-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334528",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/12",
    },
  ],
  title: "Boxed In",
  episodeType: "standard",
  stillPath: "/5rcW3QUyoA0KsajwD8WETegHXfA.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
