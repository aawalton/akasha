import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e18 = {
  id: "01a1887f-e187-7362-83fa-0edc436a1048",
  type: "page-type/episode",
  slug: "star-trek-2-s01e18",
  description:
    "With both their ships held captive by powerful beings, Kirk and the captain of the alien vessel are placed on an asteroid to fight for their lives and the lives of their crews.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-1"],
  position: 18,
  publishedAt: "1967-01-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13969",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/18",
    },
  ],
  title: "Arena",
  episodeType: "standard",
  stillPath: "/xd6rJVG4RHj7LcsIlZbQw5ltjxO.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
