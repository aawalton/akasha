import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e06 = {
  id: "01a18853-f9af-78cf-bbb6-f9a550ff7869",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e06",
  description:
    "When out on a routine training exercise, a distress signal sends Kaz and Poe to a damaged ship with strange lifeforms onboard.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 6,
  publishedAt: "2018-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1598480",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/6",
    },
  ],
  title: "Signal from Sector Six",
  episodeType: "standard",
  stillPath: "/tXXf0qdSs4rctE6kzP7nG3BxelQ.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
