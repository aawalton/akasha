import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS02e03 = {
  id: "01a1884a-e0e9-7ffe-a0b5-69b44312fabf",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s02e03",
  description:
    "The NCIS team jumps into action when video surveillance footage shows an ambush on a humvee transporting Marines in the desert. Meanwhile, Nate returns from his mystery assignment.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-2"],
  position: 3,
  publishedAt: "2010-09-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557317",
      externalLink: "https://www.themoviedb.org/tv/17610/season/2/episode/3",
    },
  ],
  title: "Borderline",
  episodeType: "standard",
  stillPath: "/8JgXZfDjIx8MUN7G8FXMEZuMoxz.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
