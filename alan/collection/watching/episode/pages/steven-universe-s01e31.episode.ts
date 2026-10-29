import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e31 = {
  id: "01a18855-67e5-77ba-972a-a624c85bb3db",
  type: "page-type/episode",
  slug: "steven-universe-s01e31",
  description:
    "Steven is taken in by Ronaldo's conspiracy theories about paranormal occurrences in Beach City.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 31,
  publishedAt: "2014-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1012740",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/31",
    },
  ],
  title: "Keep Beach City Weird!",
  episodeType: "standard",
  stillPath: "/t5IqINo9zm9vB7iR0cZUgkEmKdd.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
