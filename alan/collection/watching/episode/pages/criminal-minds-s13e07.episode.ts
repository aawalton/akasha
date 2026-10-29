import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS13e07 = {
  id: "01a18844-d7f7-7f13-8c43-1fa7ea44caaa",
  type: "page-type/episode",
  slug: "criminal-minds-s13e07",
  description:
    "The BAU searches for an unsub in Austin, Texas, who is targeting prominent members of the community.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-13"],
  position: 7,
  publishedAt: "2017-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1390858",
      externalLink: "https://www.themoviedb.org/tv/4057/season/13/episode/7",
    },
  ],
  title: "Dust and Bones",
  episodeType: "standard",
  stillPath: "/8HZiPkA57sO5VmzWlZWHc2fNNsi.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
