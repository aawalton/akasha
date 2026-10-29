import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS01e04 = {
  id: "01a18849-3527-7434-adae-89d21af05c90",
  type: "page-type/episode",
  slug: "good-witch-s01e04",
  description:
    "Cassie's mischievous cousin Abigail returns to Middleton, forcing Cassie to attempt tough love as Sam and Grace are swept up in Abigail's spell.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-1"],
  position: 4,
  publishedAt: "2015-03-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1046875",
      externalLink: "https://www.themoviedb.org/tv/61864/season/1/episode/4",
    },
  ],
  title: "All in the Family",
  episodeType: "standard",
  stillPath: "/uDlWtQ69GTBC6WQQEl1QIZjc8D3.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
