import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const downtonAbbeyS04e03 = {
  id: "01a18847-e987-769e-8578-6576e3d6e454",
  type: "page-type/episode",
  slug: "downton-abbey-s04e03",
  description:
    "An extravagant house party at the Abbey gives the Crawleys a chance to reconnect with old friends. But some guests prove more welcome than others, and along with the celebrations come skulduggery and heartache.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/downton-abbey-season-4"],
  position: 3,
  publishedAt: "2013-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "969927",
      externalLink: "https://www.themoviedb.org/tv/33907/season/4/episode/3",
    },
  ],
  title: "Episode 3",
  episodeType: "standard",
  stillPath: "/5tiDS1aokDFKaQZKjJDOyqhORHp.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:29:36.644Z",
  updatedAt: "2026-10-29T15:29:36.644Z",
} as const satisfies Episode
