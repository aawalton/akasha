import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e04 = {
  id: "01a18884-52e4-7fd4-9ce1-6b135cd72ecb",
  type: "page-type/episode",
  slug: "one-piece-s01e04",
  description:
    "Out on the sea, Luffy almost loses his hat and reflects on his past, and how a pirate named Shanks influenced him. Afterwards, Luffy meets Nami, and Buggy the Clown's men.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 4,
  publishedAt: "1999-12-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "852687",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/4",
    },
  ],
  title: "Luffy's Past! The Red-haired Shanks appears",
  episodeType: "standard",
  stillPath: "/8gqdS3yFEL1OvMXbeyftGGphUSz.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
