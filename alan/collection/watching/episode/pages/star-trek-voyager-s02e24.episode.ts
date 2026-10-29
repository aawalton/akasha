import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e24 = {
  id: "01a18853-ac8b-7c9b-9ec1-305073c0df68",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e24",
  description:
    "Stardate: 49655.2. A transporter accident merges Tuvok and Neelix into one new being who calls himself 'Tuvix.'",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 24,
  publishedAt: "1996-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113063",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/24",
    },
  ],
  title: "Tuvix",
  episodeType: "standard",
  stillPath: "/hDa3pU23Ykq7n8TuVWj8Caj6pg5.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
