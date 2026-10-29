import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS04e05 = {
  id: "01a18881-51a2-7f0b-b4c6-bd2fa89464bb",
  type: "page-type/episode",
  slug: "white-collar-s04e05",
  description: "A female art thief makes Neal an offer in exchange for important information.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/white-collar-season-4"],
  position: 5,
  publishedAt: "2012-08-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596295",
      externalLink: "https://www.themoviedb.org/tv/21510/season/4/episode/5",
    },
  ],
  title: "Honor Among Thieves",
  episodeType: "standard",
  stillPath: "/oH04uzQyNxsx3zkzRtjmLId5cZZ.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
