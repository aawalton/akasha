import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS04e19 = {
  id: "01a18851-3df7-7666-9460-7439b1b019d9",
  type: "page-type/episode",
  slug: "person-of-interest-s04e19",
  description:
    "Reese and Finch scramble to protect a software CEO when his behavior becomes increasingly erratic following a hacker attack that reveals all his secrets and unravels his life.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-4"],
  position: 19,
  publishedAt: "2015-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1048367",
      externalLink: "https://www.themoviedb.org/tv/1411/season/4/episode/19",
    },
  ],
  title: "Search and Destroy",
  episodeType: "standard",
  stillPath: "/k3M0WBvsPJYe4bkkovZSEj8vMmc.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
