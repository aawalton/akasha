import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e16 = {
  id: "01a18884-52e5-7797-85f2-e090a0729a06",
  type: "page-type/episode",
  slug: "one-piece-s01e16",
  description:
    "As the fight between Luffy and Kuro is close to an end, the Usopp Pirates do their best to avoid Jango.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 16,
  publishedAt: "2000-03-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1152986",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/16",
    },
  ],
  title: "Protect Kaya! The Usopp Pirates' Great Efforts!",
  episodeType: "standard",
  stillPath: "/bx1Edb8ItY1B7SaDT9yS3VugOzh.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
