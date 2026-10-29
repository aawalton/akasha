import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS07e01 = {
  id: "01a18849-352a-749a-b391-9a6bfcce77dc",
  type: "page-type/episode",
  slug: "good-witch-s07e01",
  description:
    "Cassie and Sam's much overdue date doesn't go as planned, and they end up stranded on an island.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-7"],
  position: 1,
  publishedAt: "2021-05-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2723609",
      externalLink: "https://www.themoviedb.org/tv/61864/season/7/episode/1",
    },
  ],
  title: "The Party",
  episodeType: "standard",
  stillPath: "/7v6OX0ob0pQJ4vLAu2HrSqRRwcw.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
