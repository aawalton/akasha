import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const warehouse13S02e10 = {
  id: "01a18859-886f-7b42-8d6b-0993bcda307e",
  type: "page-type/episode",
  slug: "warehouse-13-s02e10",
  description: "Pete and Myka use H.G. Wells's time machine to travel back to 1961.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/warehouse-13-season-2"],
  position: 10,
  publishedAt: "2010-09-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "541590",
      externalLink: "https://www.themoviedb.org/tv/15819/season/2/episode/10",
    },
  ],
  title: "Where and When",
  episodeType: "standard",
  stillPath: "/h8brC0LkMCSVn9eY3Mr46VlLNiH.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:48:51.438Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Episode
