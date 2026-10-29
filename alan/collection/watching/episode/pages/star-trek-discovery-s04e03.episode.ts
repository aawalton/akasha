import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS04e03 = {
  id: "01a18852-a9f7-727c-817e-315d54499317",
  type: "page-type/episode",
  slug: "star-trek-discovery-s04e03",
  description:
    "Burnham and Tilly hunt the killer of a Starfleet officer as Stamets and the science team race against the clock to prevent the anomaly from killing anyone else.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-4"],
  position: 3,
  publishedAt: "2021-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3345784",
      externalLink: "https://www.themoviedb.org/tv/67198/season/4/episode/3",
    },
  ],
  title: "Choose to Live",
  episodeType: "standard",
  stillPath: "/8tx3avvVJHrXFDIeCafbXn0H2gB.jpg",
  voteAverage: 4.9,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
