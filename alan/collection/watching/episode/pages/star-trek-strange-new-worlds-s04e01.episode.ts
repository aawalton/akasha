import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekStrangeNewWorldsS04e01 = {
  id: "01a18853-4347-7698-be7f-a5f070775cb4",
  type: "page-type/episode",
  slug: "star-trek-strange-new-worlds-s04e01",
  description:
    "Pike leads the crew into a stellar storm, sending the Enterprise back 65 million years.",
  ownLength: 59,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-strange-new-worlds-season-4"],
  position: 1,
  publishedAt: "2026-07-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7191125",
      externalLink: "https://www.themoviedb.org/tv/103516/season/4/episode/1",
    },
  ],
  title: "Valles Marineris",
  episodeType: "standard",
  stillPath: "/dkplcEqCZV5nNmsUm12CimwDqjy.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:00.517Z",
  updatedAt: "2026-10-29T15:42:00.517Z",
} as const satisfies Episode
