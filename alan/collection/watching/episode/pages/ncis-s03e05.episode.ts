import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e05 = {
  id: "01a1884b-ef65-7d5a-afed-1f20ee6e1574",
  type: "page-type/episode",
  slug: "ncis-s03e05",
  description:
    "When an officer is shot to death on the freeway, the NCIS team take on the investigation. The first lead, a fact that the victim was leading a double life, take them to a possible solution of the crime, but the tables are turned when the victim's dying message is discovered and it leads them to a totally different clue.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 5,
  publishedAt: "2005-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334522",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/5",
    },
  ],
  title: "Switch",
  episodeType: "standard",
  stillPath: "/qGF8BqNWamAl0GIORxSBm1J9wi0.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
