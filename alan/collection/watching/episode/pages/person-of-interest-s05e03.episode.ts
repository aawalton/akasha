import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS05e03 = {
  id: "01a18851-3df7-7a4f-adf3-8bf31850688b",
  type: "page-type/episode",
  slug: "person-of-interest-s05e03",
  description:
    "Reese’s cover could be blown when he realizes the latest POI has ties to his old CIA colleague, Kara Stanton.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-5"],
  position: 3,
  publishedAt: "2016-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1176499",
      externalLink: "https://www.themoviedb.org/tv/1411/season/5/episode/3",
    },
  ],
  title: "Truth Be Told",
  episodeType: "standard",
  stillPath: "/rrCawvI7DxHEQVduUKw9J7AxmR1.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
