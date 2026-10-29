import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e20 = {
  id: "01a1884a-e0f3-7e48-a8f6-9f289073732d",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e20",
  description:
    "After a Navy Seal is attacked while moonlighting at a security job for a successful marijuana dispensary, Sam personally vows to apprehend the suspect out of respect for the Navy Seal brotherhood",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 20,
  publishedAt: "2019-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1737394",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/20",
    },
  ],
  title: "Choke Point",
  episodeType: "standard",
  stillPath: "/eLmoHxHKSiZRgUUmTcrmYL8h3ZT.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
