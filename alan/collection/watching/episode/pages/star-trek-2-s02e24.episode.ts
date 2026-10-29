import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e24 = {
  id: "01a1887f-e189-7e33-890f-7dc1b48ac8a2",
  type: "page-type/episode",
  slug: "star-trek-2-s02e24",
  description:
    "A skeleton Enterprise crew are assigned to test a revolutionary computer system that is given total control of the ship.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 24,
  publishedAt: "1968-03-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13992",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/24",
    },
  ],
  title: "The Ultimate Computer",
  episodeType: "standard",
  stillPath: "/fqSdeBJWHo7w7h9XIHjyJFtP9X7.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
