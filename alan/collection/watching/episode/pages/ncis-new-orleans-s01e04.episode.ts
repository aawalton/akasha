import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS01e04 = {
  id: "01a1884b-3014-77b7-b6af-35263e44bd57",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s01e04",
  description:
    "After a Navy SEAL is discovered dead in a sorority house, the team need to work out if his death was due to collegiate foul play or a classified mission.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-1"],
  position: 4,
  publishedAt: "2014-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010687",
      externalLink: "https://www.themoviedb.org/tv/61387/season/1/episode/4",
    },
  ],
  title: "The Recruits",
  episodeType: "standard",
  stillPath: "/Aepp8DJs5xOLI6OYzrE7aB2F3e.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
