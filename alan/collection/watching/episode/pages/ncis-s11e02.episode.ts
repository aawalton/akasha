import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e02 = {
  id: "01a1884b-ef70-76eb-86ab-ad86c6ddea40",
  type: "page-type/episode",
  slug: "ncis-s11e02",
  description:
    "Determined to locate Ziva, Tony chases leads in Israel in search of her current whereabouts. Meanwhile, Gibbs and the team continue the hunt for Parsa and his growing terrorist ring.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 2,
  publishedAt: "2013-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334697",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/2",
    },
  ],
  title: "Past, Present, and Future",
  episodeType: "standard",
  stillPath: "/uF3krw93K6bGBdUItaswyJ5Zzcq.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
