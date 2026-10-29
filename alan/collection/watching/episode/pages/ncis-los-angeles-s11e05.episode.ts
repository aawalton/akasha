import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS11e05 = {
  id: "01a1884a-e0f4-7165-8b6c-b097e6fb67e2",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s11e05",
  description:
    "The NCIS team searches for a stolen painting valued at $40 million after online chatter indicates the artwork is being sold on the black market to fund terrorist activity.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-11"],
  position: 5,
  publishedAt: "2019-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1953328",
      externalLink: "https://www.themoviedb.org/tv/17610/season/11/episode/5",
    },
  ],
  title: "Provenance",
  episodeType: "standard",
  stillPath: "/wWpvswXdPRK6yTZBli3GujuXldc.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
