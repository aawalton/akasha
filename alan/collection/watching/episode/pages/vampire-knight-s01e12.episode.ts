import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vampireKnightS01e12 = {
  id: "01a183d8-f258-70b9-9356-c63f181930ed",
  type: "page-type/episode",
  slug: "vampire-knight-s01e12",
  description:
    "Yuki learns Maria's true identity. With this new information, Yuki accepts a deal to offer her blood in order to save Zero.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/vampire-knight-season-1"],
  position: 12,
  publishedAt: "2008-06-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "553034",
      externalLink: "https://www.themoviedb.org/tv/17149/season/1/episode/12",
    },
  ],
  title: "Vow of the Pureblood",
  episodeType: "standard",
  stillPath: "/ibzuKQDIVKwrdMknWcjcCvPislA.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:49:55.542Z",
  updatedAt: "2026-10-28T18:49:55.542Z",
} as const satisfies Episode
