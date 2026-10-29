import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e15 = {
  id: "01a1884b-ef70-7ce5-8855-17ccb010b2f3",
  type: "page-type/episode",
  slug: "ncis-s10e15",
  description:
    "On leave from NCIS while still grieving the loss of his wife and his kids’ mother, Director Vance discovers unexpected personal information that causes him to question everything.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 15,
  publishedAt: "2013-02-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334684",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/15",
    },
  ],
  title: "Hereafter",
  episodeType: "standard",
  stillPath: "/mlOvAnewXAzH9PfliQhAHWrCAzG.jpg",
  voteAverage: 5.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
