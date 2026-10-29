import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const manifestS02e02 = {
  id: "01a1884a-400a-7faf-bcdf-53f47501c47c",
  type: "page-type/episode",
  slug: "manifest-s02e02",
  description:
    "Ben forms an alliance with a student from Flight 828, whose callings either uncovered a violent crime or helped him commit one. As Saanvi strives to further her research into the death date, Grace makes a startling discovery about her pregnancy.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/manifest-season-2"],
  position: 2,
  publishedAt: "2020-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2037322",
      externalLink: "https://www.themoviedb.org/tv/79696/season/2/episode/2",
    },
  ],
  title: "Grounded",
  episodeType: "standard",
  stillPath: "/prmX51ZHMMoDhKH1t0TEUNjxVGg.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:32:09.865Z",
  updatedAt: "2026-10-29T15:32:09.865Z",
} as const satisfies Episode
