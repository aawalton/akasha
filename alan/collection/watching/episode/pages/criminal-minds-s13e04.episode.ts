import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS13e04 = {
  id: "01a18844-d7f7-7f85-ba60-b84fee851026",
  type: "page-type/episode",
  slug: "criminal-minds-s13e04",
  description:
    "The BAU investigates a workplace shooting committed by a state-of-the-art drone in Silicon Valley.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-13"],
  position: 4,
  publishedAt: "2017-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1381496",
      externalLink: "https://www.themoviedb.org/tv/4057/season/13/episode/4",
    },
  ],
  title: "Killer App",
  episodeType: "standard",
  stillPath: "/kDqlKDKQaV91DWNh7OjV0k1vBti.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
