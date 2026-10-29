import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e15 = {
  id: "01a18851-3df3-7ee2-9fc1-64da182ed838",
  type: "page-type/episode",
  slug: "person-of-interest-s01e15",
  description:
    "Reese discovers there’s more to the story after he infiltrates a smuggling ring to get close to his latest POI.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 15,
  publishedAt: "2012-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64069",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/15",
    },
  ],
  title: "Blue Code",
  episodeType: "standard",
  stillPath: "/6drPQk1qphyeuYlTVZAbNEkYubv.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
