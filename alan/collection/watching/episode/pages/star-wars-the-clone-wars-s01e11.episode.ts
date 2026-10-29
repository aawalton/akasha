import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS01e11 = {
  id: "01a18854-50a8-780c-ac35-6f57ac8998d5",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s01e11",
  description:
    "During their own attempt to kidnap Count Dooku, Anakin and Obi-Wan discover that the Sith Lord has already been captured by pirates. Hondo Ohnaka and his gang of pirates hold Dooku captive in their den on Florrum, and hold him for ransom. It's up to Anakin and Obi-Wan to see if the offer is too good to be true.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-1"],
  position: 11,
  publishedAt: "2009-01-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286578",
      externalLink: "https://www.themoviedb.org/tv/4194/season/1/episode/11",
    },
  ],
  title: "Dooku Captured",
  episodeType: "standard",
  stillPath: "/ggocqtynPU6GNNxAnlegdJdklpd.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
