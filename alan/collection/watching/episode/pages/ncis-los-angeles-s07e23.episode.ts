import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS07e23 = {
  id: "01a1884a-e0f0-7070-a97f-7e3e681c85a0",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s07e23",
  description:
    "Sam and Callen go undercover as firefighters when top secret information about suspected terrorists is stolen from a secure Department of Defense container at the site of a fire.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-7"],
  position: 23,
  publishedAt: "2016-04-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1185706",
      externalLink: "https://www.themoviedb.org/tv/17610/season/7/episode/23",
    },
  ],
  title: "Where There's Smoke...",
  episodeType: "standard",
  stillPath: "/xCFpRfptE7mDayvFip9aeyqW2TH.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
