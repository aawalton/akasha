import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e11 = {
  id: "01a1884b-ef7d-7b6b-869f-542342041f39",
  type: "page-type/episode",
  slug: "ncis-s19e11",
  description:
    "After a civilian research vessel in the North Atlantic picks up a small boat of wounded Navy officers, NCIS arrives on the ship and is forced to hide after discovering terrorists on board.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 11,
  publishedAt: "2022-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3248855",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/11",
    },
  ],
  title: "All Hands",
  episodeType: "standard",
  stillPath: "/jOQm30mvQhonTp82aINqrCBqEcT.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
