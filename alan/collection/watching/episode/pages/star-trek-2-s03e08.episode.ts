import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e08 = {
  id: "01a1887f-e18a-718c-98e8-42ef623394b6",
  type: "page-type/episode",
  slug: "star-trek-2-s03e08",
  description:
    "The crew of the Enterprise rush to stop an asteroid from colliding with a Federation world, but discover the asteroid is actually an inhabited generation ship.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 8,
  publishedAt: "1968-11-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14019",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/8",
    },
  ],
  title: "For the World Is Hollow and I Have Touched the Sky",
  episodeType: "standard",
  stillPath: "/jbUcR3f5vfTncbI0fXlsjyP5eB9.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
