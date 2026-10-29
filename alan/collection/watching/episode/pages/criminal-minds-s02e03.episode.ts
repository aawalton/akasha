import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS02e03 = {
  id: "01a18883-a8b0-77c2-90b8-6afece68fbb8",
  type: "page-type/episode",
  slug: "criminal-minds-s02e03",
  description:
    "The BAU has reason to believe a series of murders might have been committed by two people working as a team after the victims' families receive DVDs after each crime that includes psychological attacks.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/criminal-minds-season-2"],
  position: 3,
  publishedAt: "2006-10-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "955073",
      externalLink: "https://www.themoviedb.org/tv/4057/season/2/episode/3",
    },
  ],
  title: "The Perfect Storm",
  episodeType: "standard",
  stillPath: "/i7TPFMb5vWh7uhha668wvixQbkO.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
