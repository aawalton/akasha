import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e21 = {
  id: "01a18853-ac90-7e97-9d21-2a888732b3a8",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e21",
  description:
    "Stardate: Unknown. Under the guidance of the Doctor, Seven of Nine learns some social aspects of human dating.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 21,
  publishedAt: "1999-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113261",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/21",
    },
  ],
  title: "Someone to Watch Over Me",
  episodeType: "standard",
  stillPath: "/5J6R08W3L1Zlfzgsx0mwr5wmRHW.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
