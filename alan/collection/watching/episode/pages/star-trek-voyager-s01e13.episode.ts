import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e13 = {
  id: "01a18853-ac8a-720e-9ed0-91e7fbcc0f2e",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e13",
  description:
    "Stardate: 48784.2. The Vidiians capture Paris, Torres and Durst while on an away mission. Torres is taken to a lab and 'split' into two people: one human, and one Klingon.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 13,
  publishedAt: "1995-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112952",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/13",
    },
  ],
  title: "Faces",
  episodeType: "standard",
  stillPath: "/gVE4rEyLnaote2VESMc8k7XKFUV.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
