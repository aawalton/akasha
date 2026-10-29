import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e23 = {
  id: "01a1887f-e187-787c-8843-d68f456a3259",
  type: "page-type/episode",
  slug: "star-trek-2-s01e23",
  description:
    'The Enterprise arrives at a planet to establish diplomatic relations and finds itself in the middle of a "peaceful" war that threatens to destroy the ship.',
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 23,
  publishedAt: "1967-02-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13975",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/23",
    },
  ],
  title: "A Taste of Armageddon",
  episodeType: "standard",
  stillPath: "/gfLLXC1MEXDu84xqYCv8G7gQCRh.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
