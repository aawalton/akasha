import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e26 = {
  id: "01a1887f-e189-7efe-8b68-e8bb450870a8",
  type: "page-type/episode",
  slug: "star-trek-2-s02e26",
  description:
    "While back in time observing Earth in 1968, the Enterprise crew encounters the mysterious Gary Seven who has his own agenda on the planet.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 26,
  publishedAt: "1968-03-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13985",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/26",
    },
  ],
  title: "Assignment: Earth",
  episodeType: "finale",
  stillPath: "/e2Jw6LodVxH6KbyYI5rlrwnymLf.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
