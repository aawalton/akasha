import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS03e03 = {
  id: "01a18885-4804-7ef0-b8e7-e034749d881f",
  type: "page-type/episode",
  slug: "the-rookie-s03e03",
  description:
    "Officer John Nolan's mom makes an unannounced visit that complicates his life, and Sergeant Grey considers retiring.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-rookie-season-3"],
  position: 3,
  publishedAt: "2021-01-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2614180",
      externalLink: "https://www.themoviedb.org/tv/79744/season/3/episode/3",
    },
  ],
  title: "La Fiera",
  episodeType: "standard",
  stillPath: "/zoLvW5thL7MlUR5gDZmHH45sdRf.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:36:38.529Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Episode
