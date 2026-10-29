import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e08 = {
  id: "01a18853-ac8f-7637-b834-b8f74cb43434",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e08",
  description:
    "Stardate: Unknown. A moral dilemma arises when the Doctor is forced to consult the specialized medical database of a Cardassian war criminal in order to save Torres' life.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 8,
  publishedAt: "1998-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113211",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/8",
    },
  ],
  title: "Nothing Human",
  episodeType: "standard",
  stillPath: "/vTQsnEKjuBgIbBb2jJ4ylyJsEdg.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
