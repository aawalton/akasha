import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS04e13 = {
  id: "01a1884a-e0ec-7f29-a43d-b9411588ef39",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s04e13",
  description:
    "Callen goes undercover to infiltrate a network of Chechen terrorists who are recruiting foreign fighters to join their cause and planning their next attack in the U.S.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-4"],
  position: 13,
  publishedAt: "2013-01-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557363",
      externalLink: "https://www.themoviedb.org/tv/17610/season/4/episode/13",
    },
  ],
  title: "The Chosen One",
  episodeType: "standard",
  stillPath: "/eE8vtU4uGBkNvWiytRbq8mE3M5v.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
