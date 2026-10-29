import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e21 = {
  id: "01a1887f-e187-7728-bc3e-5c52edd1a2f6",
  type: "page-type/episode",
  slug: "star-trek-2-s01e21",
  description:
    'The Enterprise encounters a seemingly peaceful civilization run by a "benevolent" being named Landru... who intends for them to join his people.',
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 21,
  publishedAt: "1967-02-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13973",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/21",
    },
  ],
  title: "The Return of the Archons",
  episodeType: "standard",
  stillPath: "/gDJR5f58VriB3aFC7RXegTNTfty.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
