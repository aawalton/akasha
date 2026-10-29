import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS13e01 = {
  id: "01a18844-d7f6-700a-a0cb-7d9c54bfd239",
  type: "page-type/episode",
  slug: "criminal-minds-s13e01",
  description:
    "In the wake of a devastating attack, the BAU works with former International Response Team member Matthew Simmons to save one of their own from escaped serial killer Peter Lewis.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-13"],
  position: 1,
  publishedAt: "2017-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1372150",
      externalLink: "https://www.themoviedb.org/tv/4057/season/13/episode/1",
    },
  ],
  title: "Wheels Up",
  episodeType: "standard",
  stillPath: "/yONUsV6toyAiFSjMA58d6k8zU8P.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
