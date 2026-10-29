import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e03 = {
  id: "01a1887f-e188-723d-95d1-90a88a0ddd75",
  type: "page-type/episode",
  slug: "star-trek-2-s02e03",
  description:
    "The crew of the USS Enterprise deals with an indestructible planet-destroying space probe.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 3,
  publishedAt: "1967-09-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13991",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/3",
    },
  ],
  title: "The Changeling",
  episodeType: "standard",
  stillPath: "/3nyC4ys3Kq8ylufRnPJoNTK12oS.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
