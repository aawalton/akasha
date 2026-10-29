import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS01e11 = {
  id: "01a18848-c2b9-7738-8382-2c6009739a08",
  type: "page-type/episode",
  slug: "friends-s01e11",
  description:
    "Chandler's romance-novelist mother comes to New York to visit him, and Joey catches her and Ross kissing.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-1"],
  position: 11,
  publishedAt: "1995-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86066",
      externalLink: "https://www.themoviedb.org/tv/1668/season/1/episode/11",
    },
  ],
  title: "The One with Mrs. Bing",
  episodeType: "standard",
  stillPath: "/58nJXiv4gVLpaxKmI937ppmbCgy.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
