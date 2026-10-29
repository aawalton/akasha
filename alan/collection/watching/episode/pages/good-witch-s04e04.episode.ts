import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS04e04 = {
  id: "01a18849-3529-74a7-b321-e2ddbc6afce1",
  type: "page-type/episode",
  slug: "good-witch-s04e04",
  description:
    "Cassie, Sam, Nick and Grace “play house” as they spend a night away at the family lake house. Hoping to bring everyone together, Cassie faces a few obstacles before they start acting like a family again.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-4"],
  position: 4,
  publishedAt: "2018-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1479624",
      externalLink: "https://www.themoviedb.org/tv/61864/season/4/episode/4",
    },
  ],
  title: "Family Time",
  episodeType: "standard",
  stillPath: "/2x7gwyVaUalrNaDhWeiPCSEJGrM.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
