import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e02 = {
  id: "01a18855-67e4-74d1-8e17-0500df026f47",
  type: "page-type/episode",
  slug: "steven-universe-s01e02",
  description:
    "When a menacing red eye is about to hit Beach City, the only thing that can destroy it is a Laser Light Cannon which once belonged to Steven's mother, Rose Quartz. Thus, Steven enlists the help of his father, Greg, and they search through his storage for the cannon.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 2,
  publishedAt: "2013-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003595",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/2",
    },
  ],
  title: "Laser Light Cannon",
  episodeType: "standard",
  stillPath: "/r8r9uaOLmdvONa0Q2YoIY6F0Bmr.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
