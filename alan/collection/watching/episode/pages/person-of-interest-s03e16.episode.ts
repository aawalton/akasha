import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS03e16 = {
  id: "01a18851-3df6-7d42-af06-4e00c1a7edb5",
  type: "page-type/episode",
  slug: "person-of-interest-s03e16",
  description:
    "The secrets of Finch’s operation before he enlisted Reese are revealed, including shocking ties to present-day events.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-3"],
  position: 16,
  publishedAt: "2014-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "972352",
      externalLink: "https://www.themoviedb.org/tv/1411/season/3/episode/16",
    },
  ],
  title: "RAM",
  episodeType: "standard",
  stillPath: "/b13kCCbu3vmYtHgaew2lsAdxfO5.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
