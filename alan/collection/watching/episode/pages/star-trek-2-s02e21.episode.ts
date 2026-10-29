import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e21 = {
  id: "01a1887f-e189-703a-9445-b63b5a783fe2",
  type: "page-type/episode",
  slug: "star-trek-2-s02e21",
  description:
    'The crew of the Enterprise tracks down a Federation observer on a planet dominated by a "Naziesque" regime.',
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 21,
  publishedAt: "1968-02-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14007",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/21",
    },
  ],
  title: "Patterns of Force",
  episodeType: "standard",
  stillPath: "/zbanvHtkqQIJ18QjyA7ZURGePwM.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
