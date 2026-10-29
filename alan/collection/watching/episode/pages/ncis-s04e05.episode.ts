import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e05 = {
  id: "01a1884b-ef66-7954-9f49-7360510434a6",
  type: "page-type/episode",
  slug: "ncis-s04e05",
  description:
    "When a missing Lance Corporal is found dead in a vacant house, the NCIS team discover that he was buried in the backyard and then exhumed. They learn about his identity and that he was to be deployed to Iraq, but he never showed up for duty.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 5,
  publishedAt: "2006-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334476",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/5",
    },
  ],
  title: "Dead and Unburied",
  episodeType: "standard",
  stillPath: "/gB4ZwrwepRlQS7Tnns6DppWcrib.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
