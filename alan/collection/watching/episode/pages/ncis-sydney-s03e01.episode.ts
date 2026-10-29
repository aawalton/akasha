import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisSydneyS03e01 = {
  id: "01a1884b-6701-7355-828d-3aae01f37333",
  type: "page-type/episode",
  slug: "ncis-sydney-s03e01",
  description:
    "The discovery of two missing U.S. Navy aviators adrift in the Coral Sea leads the team to expose a sinister terrorist plot.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-sydney-season-3"],
  position: 1,
  publishedAt: "2025-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6454677",
      externalLink: "https://www.themoviedb.org/tv/157950/season/3/episode/1",
    },
  ],
  title: "Gut Instinct",
  episodeType: "standard",
  stillPath: "/1aHViFPsx3S6qYOV7aJBYoAD27S.jpg",
  voteAverage: 3.5,
  createdAt: "2026-10-29T15:33:25.376Z",
  updatedAt: "2026-10-29T15:33:25.376Z",
} as const satisfies Episode
