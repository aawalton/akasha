import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS01e06 = {
  id: "01a18853-07cd-716b-a0f9-28690f693c81",
  type: "page-type/episode",
  slug: "star-trek-picard-s01e06",
  description:
    "Picard and the crew track Soji to the Borg cube in Romulan space, resurfacing haunting memories for Picard. Meanwhile, Narek believes he finally found a way to safely exploit Soji for information.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-1"],
  position: 6,
  publishedAt: "2020-02-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2057381",
      externalLink: "https://www.themoviedb.org/tv/85949/season/1/episode/6",
    },
  ],
  title: "The Impossible Box",
  episodeType: "standard",
  stillPath: "/wymJPBehQiO9HCmtVdJWVUIhnxb.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
