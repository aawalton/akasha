import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e10 = {
  id: "01a18853-1b89-7790-a0df-243b19804404",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e10",
  description:
    "On the run from their time-erasing pursuers, the Infinity crew and their new ally search for an escape. The Voyager embarks on a rescue mission.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 10,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230744",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/10",
    },
  ],
  title: "The Devourer of All Things (2)",
  episodeType: "standard",
  stillPath: "/rAZ57d1yeEHBtUabKS0LgOHesEP.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
