import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e11 = {
  id: "01a1887f-e188-7fcd-a313-ca4a0ee9e39e",
  type: "page-type/episode",
  slug: "star-trek-2-s02e11",
  description: "The crew of the Enterprise become entangled in a planet's tribal power struggle.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 11,
  publishedAt: "1967-12-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13994",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/11",
    },
  ],
  title: "Friday's Child",
  episodeType: "standard",
  stillPath: "/6ap2ccXZ7U4ry1otz5119mQ2caS.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
