import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS09e11 = {
  id: "01a1884a-e0f2-7dd6-add8-a8448ebb372f",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s09e11",
  description:
    "The team investigates a ransomware attack that takes out the entire power grid for west L.A. and paralyzes the city. Also, as the first holiday season since the death of Sam’s wife approaches, he struggles to find the best way for his family to celebrate.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-9"],
  position: 11,
  publishedAt: "2017-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1402016",
      externalLink: "https://www.themoviedb.org/tv/17610/season/9/episode/11",
    },
  ],
  title: "All is Bright",
  episodeType: "standard",
  stillPath: "/wkBkYUwgiQdZZI3W6b6C2qgjmeB.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
