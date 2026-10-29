import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e03 = {
  id: "01a1884a-e0f3-72da-b9d2-28c64b74805d",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e03",
  description:
    "Callen and Sam are assigned protection duty for Deputy Crown Prince Kamal after an unknown assassin targets his decoy upon his arrival in Los Angeles.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 3,
  publishedAt: "2018-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1575247",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/3",
    },
  ],
  title: "The Prince",
  episodeType: "standard",
  stillPath: "/7cs2TgMw1iVgKb1ydVpNelEudNn.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
