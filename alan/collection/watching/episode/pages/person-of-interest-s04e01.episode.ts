import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS04e01 = {
  id: "01a18851-3df6-7527-92c4-5caa75754b83",
  type: "page-type/episode",
  slug: "person-of-interest-s04e01",
  description:
    "Forced to take on new identities provided by Root, the team members try to adapt to their new lives. However, some find it hard to ignore The Machine's numbers, which puts them all at risk of being detected by Samaritan.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-4"],
  position: 1,
  publishedAt: "2014-09-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1000646",
      externalLink: "https://www.themoviedb.org/tv/1411/season/4/episode/1",
    },
  ],
  title: "Panopticon",
  episodeType: "standard",
  stillPath: "/7ZsS8mEITUp0qBuCWfjDuvi8m7L.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
