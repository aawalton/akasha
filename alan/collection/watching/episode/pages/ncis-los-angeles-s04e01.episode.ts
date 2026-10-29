import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS04e01 = {
  id: "01a1884a-e0eb-7120-81b4-e6801ac5893e",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s04e01",
  description:
    "Following Callen’s public shooting of the Chameleon, all is not well with the NCIS: LA team, as Callen is placed on suspension and Hetty adjusts to retired life.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-4"],
  position: 1,
  publishedAt: "2012-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557350",
      externalLink: "https://www.themoviedb.org/tv/17610/season/4/episode/1",
    },
  ],
  title: "Endgame",
  episodeType: "standard",
  stillPath: "/dvds0KENsztA0nC5pjWwCevXfCL.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
