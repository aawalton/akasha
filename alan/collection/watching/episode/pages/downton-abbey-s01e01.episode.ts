import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const downtonAbbeyS01e01 = {
  id: "01a18847-e984-75dc-a4ac-c9cb6959a82d",
  type: "page-type/episode",
  slug: "downton-abbey-s01e01",
  description:
    "After the death of the heir, Violet wishes that Robert's daughter Mary could inherit Downton Abbey.",
  ownLength: 68,
  ownProgress: 0,
  partOfCollections: ["season/downton-abbey-season-1"],
  position: 1,
  publishedAt: "2010-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "779837",
      externalLink: "https://www.themoviedb.org/tv/33907/season/1/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  stillPath: "/u77xU6Jlh4ZlS7rXEWl8XNlcXAv.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:29:36.644Z",
  updatedAt: "2026-10-29T15:29:36.644Z",
} as const satisfies Episode
