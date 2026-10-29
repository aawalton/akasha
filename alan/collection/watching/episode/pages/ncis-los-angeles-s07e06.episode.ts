import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS07e06 = {
  id: "01a1884a-e0ef-7156-8d29-835b44ceab6c",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s07e06",
  description:
    "The NCIS team searches for Sam’s former partner, Ruiz, who disappears during an undercover operation to buy a deadly explosive.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-7"],
  position: 6,
  publishedAt: "2015-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1133996",
      externalLink: "https://www.themoviedb.org/tv/17610/season/7/episode/6",
    },
  ],
  title: "Unspoken",
  episodeType: "standard",
  stillPath: "/6T1FhRyjnLykHSL2IicikrSKwao.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
