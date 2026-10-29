import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e01 = {
  id: "01a18854-82d1-772a-98e8-3144f40f5d86",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e01",
  description:
    "The team desperately attempts to stop two Wraith hive ships from reaching Earth. Sheppard must rely on an old foe to rescue McKay and Ronon.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 1,
  publishedAt: "2006-07-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168495",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/1",
    },
  ],
  title: "No Man's Land (2)",
  episodeType: "standard",
  stillPath: "/uL9bbbIE795DtTbZBPZJygPYgZm.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
