import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e13 = {
  id: "01a1887f-e186-7679-9148-16970564e54d",
  type: "page-type/episode",
  slug: "star-trek-2-s01e13",
  description:
    "Contacted by one of the other two witnesses to the crimes of mass murderer  “Kodos the Executioner,” Kirk is persuaded that the criminal may be disguising himself as an actor in a traveling theatrical troupe.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 13,
  publishedAt: "1966-12-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13968",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/13",
    },
  ],
  title: "The Conscience of the King",
  episodeType: "standard",
  stillPath: "/fT3gCMagVTYQRSaGPrgdJCUcIZe.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
