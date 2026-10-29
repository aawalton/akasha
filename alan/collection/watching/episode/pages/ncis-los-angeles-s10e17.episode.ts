import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e17 = {
  id: "01a1884a-e0f3-7b37-a00c-aa525e1e737f",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e17",
  description:
    "After months of planning, the NCIS family celebrates the wedding of Kensi and Deeks. Also, an old acquaintance, Anatoli Kirkin, pays Deeks a surprise visit on his wedding day and he isn’t alone.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 17,
  publishedAt: "2019-03-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1713507",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/17",
    },
  ],
  title: "Till Death Do Us Part",
  episodeType: "standard",
  stillPath: "/jnwYmgpKvIJRZTI7J8gbFpsNUPh.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
