import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS02e04 = {
  id: "01a1885a-252b-7abd-8ea1-41cb27612eb2",
  type: "page-type/episode",
  slug: "young-sheldon-s02e04",
  description:
    "When George Sr. asks Sheldon to keep a secret from Mary, the stress of not being honest drives Sheldon to hideout at Tam’s for his first sleepover.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-2"],
  position: 4,
  publishedAt: "2018-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1578464",
      externalLink: "https://www.themoviedb.org/tv/71728/season/2/episode/4",
    },
  ],
  title: "A Financial Secret and Fish Sauce",
  episodeType: "standard",
  stillPath: "/3WPuigW7zlG4JmP5AEkR3zObw1N.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
