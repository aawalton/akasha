import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e124 = {
  id: "01a183d1-bb53-7523-8680-76ee109ae0a4",
  type: "page-type/episode",
  slug: "naruto-s03e124",
  description:
    "Rock Lee's back and he's full of a special medicine that has Kimimaro on the run! Can he take out the fifth Sound Ninja?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 124,
  publishedAt: "2005-03-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908101",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/124",
    },
  ],
  title: "The Beast Within",
  episodeType: "standard",
  stillPath: "/vFmR0felFFCe3JwQhxKCQ6JnuO8.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
