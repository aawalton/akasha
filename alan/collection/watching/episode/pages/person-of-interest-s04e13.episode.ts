import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS04e13 = {
  id: "01a18851-3df7-7fa7-9ad9-019a0fc4c841",
  type: "page-type/episode",
  slug: "person-of-interest-s04e13",
  description:
    "Root and Reese investigate a small town in upstate New York that holds the key to Shaw's location... and whether she's dead or alive.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-4"],
  position: 13,
  publishedAt: "2015-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1035210",
      externalLink: "https://www.themoviedb.org/tv/1411/season/4/episode/13",
    },
  ],
  title: "M.I.A.",
  episodeType: "standard",
  stillPath: "/kSMHwWA8OvNSU8zw4MS1VtWQjQj.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
