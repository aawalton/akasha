import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sherlockS04e03 = {
  id: "01a1887f-adf0-769a-89e0-99842a13e534",
  type: "page-type/episode",
  slug: "sherlock-s04e03",
  description: "Holmes and Watson travel to Europe to escape Moriarty's vengeance.",
  ownLength: 89,
  ownProgress: 89,
  partOfCollections: ["season/sherlock-season-4"],
  position: 3,
  publishedAt: "2017-01-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1251091",
      externalLink: "https://www.themoviedb.org/tv/19885/season/4/episode/3",
    },
  ],
  title: "The Final Problem",
  episodeType: "finale",
  stillPath: "/mZHXncZhEd6X7U7n24KLOdfN6Z2.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:30:31.407Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Episode
