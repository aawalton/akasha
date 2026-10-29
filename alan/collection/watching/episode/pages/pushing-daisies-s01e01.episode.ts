import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const pushingDaisiesS01e01 = {
  id: "01a1887f-251b-7d11-8ff6-0588d455ebeb",
  type: "page-type/episode",
  slug: "pushing-daisies-s01e01",
  description:
    "Ned works in a pie store and seems to lead a perfectly normal life. This, however, is far from the truth. Ned can, through the touch of his hand, wake people from the dead. He decides to use this ability of his to solve crimes, but this appears to be much more difficult than it sounds, when he gives life to his childhood crush, and decides to let keep living.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/pushing-daisies-season-1"],
  position: 1,
  publishedAt: "2007-10-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "364441",
      externalLink: "https://www.themoviedb.org/tv/5639/season/1/episode/1",
    },
  ],
  title: "Pie-lette",
  episodeType: "standard",
  stillPath: "/kHN7ETAkPlgHJPHDoE8Koh0kaHj.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:29:56.379Z",
  updatedAt: "2026-10-29T16:29:56.379Z",
} as const satisfies Episode
