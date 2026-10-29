import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e06 = {
  id: "01a1887f-e18a-7c73-aa43-826a948d668c",
  type: "page-type/episode",
  slug: "star-trek-2-s03e06",
  description:
    "Having been found trespassers into Melkotian space, Captain Kirk and his companions are sent to die in a re-enactment of the gunfight at the O.K. Corral.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 6,
  publishedAt: "1968-10-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14011",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/6",
    },
  ],
  title: "Spectre of the Gun",
  episodeType: "standard",
  stillPath: "/46xm2TBlVjsIKUM2vAstNLLIrls.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
