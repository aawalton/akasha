import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS04e20 = {
  id: "01a18851-3df7-7d0e-ab4f-8aa088414791",
  type: "page-type/episode",
  slug: "person-of-interest-s04e20",
  description:
    "Reese finds himself on a dangerous personal journey when he takes on a homicide case Detective Carter was never able to close.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-4"],
  position: 20,
  publishedAt: "2015-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1050114",
      externalLink: "https://www.themoviedb.org/tv/1411/season/4/episode/20",
    },
  ],
  title: "Terra Incognita",
  episodeType: "standard",
  stillPath: "/6kAY3PbjNKcCc4Ke33ClYHocS3.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
