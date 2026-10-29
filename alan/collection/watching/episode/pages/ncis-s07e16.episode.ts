import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e16 = {
  id: "01a1884b-ef6a-77e7-acdc-68362fd4bbf9",
  type: "page-type/episode",
  slug: "ncis-s07e16",
  description:
    "Secrets arise when Gibbs' former mother-in-law surfaces as a witness in a murder investigation.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 16,
  publishedAt: "2010-03-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334555",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/16",
    },
  ],
  title: "Mother's Day",
  episodeType: "standard",
  stillPath: "/zqtP2cH7vk6MoINpWl3OjAcnhM3.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
