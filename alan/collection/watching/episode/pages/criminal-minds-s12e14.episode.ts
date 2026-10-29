import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS12e14 = {
  id: "01a18844-d7f6-7d72-966f-ab261d8d8590",
  type: "page-type/episode",
  slug: "criminal-minds-s12e14",
  description:
    "The BAU investigates the cause of several fatal car crashes involving drivers and pedestrians. Also, Reid gets bad news.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-12"],
  position: 14,
  publishedAt: "2017-02-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1275819",
      externalLink: "https://www.themoviedb.org/tv/4057/season/12/episode/14",
    },
  ],
  title: "Collision Course",
  episodeType: "standard",
  stillPath: "/jDH4FqXRjc59fhHdGIBdgPymGA2.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
