import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS10e01 = {
  id: "01a18856-4008-706b-83f8-5339aef1d2ee",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s10e01",
  description:
    "After Sheldon’s mother and Leonard's father share an evening together, everyone deals with an awkward morning the next day. Also, Penny’s family arrives for the wedding ceremony, including her anxiety-ridden mother, Susan, and her drug dealing brother, Randall.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-10"],
  position: 1,
  publishedAt: "2016-09-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1221931",
      externalLink: "https://www.themoviedb.org/tv/1418/season/10/episode/1",
    },
  ],
  title: "The Conjugal Conjecture",
  episodeType: "standard",
  stillPath: "/9DPH88iL7f0GEFq8BggmOc6L0vk.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
