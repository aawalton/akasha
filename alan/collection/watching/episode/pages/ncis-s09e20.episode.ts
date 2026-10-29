import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e20 = {
  id: "01a1884b-ef6f-7fd9-a74d-7563ded6c995",
  type: "page-type/episode",
  slug: "ncis-s09e20",
  description:
    "Following the murder of a Marine, Tony and Ziva join Ziva’s longtime friend and mentor in Columbia in a search for a missing Marine Lieutenant and Navy Chaplain.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 20,
  publishedAt: "2012-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334610",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/20",
    },
  ],
  title: "The Missionary Position",
  episodeType: "standard",
  stillPath: "/hiEYDOYubej8zMKOYIpfCBTolIU.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
