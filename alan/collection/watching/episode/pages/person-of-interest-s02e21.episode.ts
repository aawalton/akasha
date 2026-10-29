import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS02e21 = {
  id: "01a18851-3df5-7291-af94-9427d6062ce2",
  type: "page-type/episode",
  slug: "person-of-interest-s02e21",
  description:
    "When a virus causes the machine to malfunction, numbers are issued irregularly; the team searches for an extremely elusive tech millionaire.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-2"],
  position: 21,
  publishedAt: "2013-05-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64095",
      externalLink: "https://www.themoviedb.org/tv/1411/season/2/episode/21",
    },
  ],
  title: "Zero Day",
  episodeType: "standard",
  stillPath: "/7p2fY9A4rqqh32vrShqYbmPjwbj.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
