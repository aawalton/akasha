import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS18e02 = {
  id: "01a18844-d7fa-7b0e-9931-b2f36fdc31bb",
  type: "page-type/episode",
  slug: "criminal-minds-s18e02",
  description:
    'Voit awakens from his coma. The team finds videos from a dormant Sicarius Network killer called "The Zookeeper" indicating that the network has reactivated. With Voit still in recovery, the BAU must tackle this reawakened network on their own.',
  ownLength: 58,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-18-evolution-season-3"],
  position: 2,
  publishedAt: "2025-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6047488",
      externalLink: "https://www.themoviedb.org/tv/4057/season/18/episode/2",
    },
  ],
  title: "The Zookeeper",
  episodeType: "standard",
  stillPath: "/zk7h1EoYfgL4ua13hDjOyX2TWgv.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
