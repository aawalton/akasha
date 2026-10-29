import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e07 = {
  id: "01a18851-3df2-7e82-affd-12bbadf04a65",
  type: "page-type/episode",
  slug: "person-of-interest-s01e07",
  description:
    "The Machine identifies a school teacher who witnessed a mob hit as their next POI and Reese and Finch rush to save his life.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 7,
  publishedAt: "2011-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64061",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/7",
    },
  ],
  title: "Witness",
  episodeType: "standard",
  stillPath: "/6TtcwXXZFFkXT5bzhiJ2Pcon1NK.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
