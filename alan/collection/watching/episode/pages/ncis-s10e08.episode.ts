import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e08 = {
  id: "01a1884b-ef6f-74eb-b51c-5f31331be7a8",
  type: "page-type/episode",
  slug: "ncis-s10e08",
  description:
    "As the NCIS team investigates a teenage girl’s abduction, Ziva and Abby work closely with her young friend who witnessed the kidnapping. As the investigation unfolds, Gibbs seeks help from a past contact, Miranda Pennebaker, a well-connected woman with questionable morals.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 8,
  publishedAt: "2012-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334678",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/8",
    },
  ],
  title: "Gone",
  episodeType: "standard",
  stillPath: "/916Izq6EWwutv7MnlWwE0uVbt1K.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
