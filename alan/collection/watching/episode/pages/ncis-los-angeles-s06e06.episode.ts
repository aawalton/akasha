import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e06 = {
  id: "01a1884a-e0ee-7d57-84cd-12d4efe75585",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e06",
  description:
    "Sam is arrested accused of murdering a woman and Callen and Granger attempt to clear his name.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 6,
  publishedAt: "2014-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1012082",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/6",
    },
  ],
  title: "SEAL Hunter",
  episodeType: "standard",
  stillPath: "/93BrvUWVyWo1zJJY4YABZAO4ndX.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
