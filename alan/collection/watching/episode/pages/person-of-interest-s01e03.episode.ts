import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e03 = {
  id: "01a18851-3df2-7a83-97dc-53d790be6463",
  type: "page-type/episode",
  slug: "person-of-interest-s01e03",
  description:
    "Reese goes undercover to find the threat surrounding the next person on Finch's list: a young army veteran named Joey Durban.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 3,
  publishedAt: "2011-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64057",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/3",
    },
  ],
  title: "Mission Creep",
  episodeType: "standard",
  stillPath: "/iRXOTHZwkrP7Q0qtb0hsITPww1p.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
