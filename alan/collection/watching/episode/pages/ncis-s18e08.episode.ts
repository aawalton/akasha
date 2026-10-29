import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e08 = {
  id: "01a1884b-ef7a-704a-a909-a99aa8f81ab4",
  type: "page-type/episode",
  slug: "ncis-s18e08",
  description:
    "When Sloane’s name is discovered in Afghanistan at the site of an abandoned bus with a dead driver, Gibbs accompanies her on a trip to find a group of girls who were kidnapped from the bus.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 8,
  publishedAt: "2021-03-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2704073",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/8",
    },
  ],
  title: "True Believer",
  episodeType: "standard",
  stillPath: "/ecrds5ripoy4Fq8ugdIYmLVu3Nx.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
