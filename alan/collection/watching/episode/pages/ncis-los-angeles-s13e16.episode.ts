import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS13e16 = {
  id: "01a1884a-e0f6-79b3-acf1-96103157db53",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s13e16",
  description:
    "NCIS investigates the kidnapping of Master Sergeant Boomer, a military working dog. Also, Sam looks to sell his boat so he can take care of his father who is suffering from Alzheimer's.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-13"],
  position: 16,
  publishedAt: "2022-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3658351",
      externalLink: "https://www.themoviedb.org/tv/17610/season/13/episode/16",
    },
  ],
  title: "MWD",
  episodeType: "standard",
  stillPath: "/vIvlTx998EGXYUvoMkY78cX71f4.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
