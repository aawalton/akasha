import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e15 = {
  id: "01a1887f-e18a-706c-9650-547db3ad0987",
  type: "page-type/episode",
  slug: "star-trek-2-s03e15",
  description:
    "The Enterprise encounters two duo-chromatic and mutually belligerent aliens who put the ship in the middle of their old conflict.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 15,
  publishedAt: "1969-01-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14032",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/15",
    },
  ],
  title: "Let That Be Your Last Battlefield",
  episodeType: "standard",
  stillPath: "/pZXeR6eZIXUMBkKHcwYcGpqpQUd.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
