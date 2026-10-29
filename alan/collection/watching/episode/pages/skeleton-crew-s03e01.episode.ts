import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS03e01 = {
  id: "01a18852-196a-7287-8110-dc4547ca1123",
  type: "page-type/episode",
  slug: "skeleton-crew-s03e01",
  description:
    "Another year, another Halloween, as Hunter and Anthony celebrate with friends old and new. But spirits are restless on Halloween, as everyone gathered will soon find out.",
  ownLength: 38,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-3"],
  position: 1,
  publishedAt: "2017-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380469",
      externalLink: "https://www.themoviedb.org/tv/225011/season/3/episode/1",
    },
  ],
  title: "The Laughing Dead",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
