import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e06 = {
  id: "01a1884b-ef65-7d51-ae7f-ac7acf6efe35",
  type: "page-type/episode",
  slug: "ncis-s03e06",
  description:
    "The NCIS team take up a strange case - a Marine's wife was murdered live on the Internet. The investigation reveals that two housewives were running a live Internet sex site and now they are both missing. While looking for them, the team will try to track down the webmaster and solve the alleged murder case.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 6,
  publishedAt: "2005-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334523",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/6",
    },
  ],
  title: "The Voyeur's Web",
  episodeType: "standard",
  stillPath: "/160NliksaHZCz1uZTQo7J8tz6kM.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
