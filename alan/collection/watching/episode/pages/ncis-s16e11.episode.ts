import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e11 = {
  id: "01a1884b-ef78-74a1-94e1-6f5caa16feb2",
  type: "page-type/episode",
  slug: "ncis-s16e11",
  description:
    "United States Secretary of Defense Wynn Crawford shuts down Gibbs' murder investigation and demands that Special Agents McGee and Torres be arrested for their actions in the case.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 11,
  publishedAt: "2019-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1639149",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/11",
    },
  ],
  title: "Toil and Trouble",
  episodeType: "standard",
  stillPath: "/srgdNBJQ6zi81FWHQGNbf1y7KiU.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
