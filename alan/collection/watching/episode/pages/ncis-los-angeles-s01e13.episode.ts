import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e13 = {
  id: "01a1884a-e0e8-7d3d-8faa-c6749b20a211",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e13",
  description:
    'The team rushes to a crime scene after receiving an "agent needs assistance" page and learns that one of their own is in peril.',
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 13,
  publishedAt: "2010-01-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557289",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/13",
    },
  ],
  title: "Missing",
  episodeType: "standard",
  stillPath: "/jogPQGQ6dbTdpkS21jRC2EyG35E.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
