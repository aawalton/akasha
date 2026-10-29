import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e09 = {
  id: "01a1884a-e0f3-7343-86c5-367f4784fb44",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e09",
  description:
    "The NCIS team investigates the home invasion of Navy Captain Dean Hadlow, who was entertaining his friend, General Omer Abidi of Pakistan, when robbers successfully stole money, jewelry and highly classified information. Also, Deeks and Kensi interview candidates to manage the bar.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 9,
  publishedAt: "2018-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1621180",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/9",
    },
  ],
  title: "A Diamond in the Rough",
  episodeType: "standard",
  stillPath: "/25r1C9DPcptoJWNbGsDA7EdCyHl.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
