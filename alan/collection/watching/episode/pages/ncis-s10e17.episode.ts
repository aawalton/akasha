import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e17 = {
  id: "01a1884b-ef70-76f5-bc94-3a01102c614e",
  type: "page-type/episode",
  slug: "ncis-s10e17",
  description:
    "A media frenzy surrounding an unidentified criminal prompts Gibbs’ barber to question his son’s involvement and ask for Gibbs’ help in ruling out his son as a prime suspect.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 17,
  publishedAt: "2013-03-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334686",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/17",
    },
  ],
  title: "Prime Suspect",
  episodeType: "standard",
  stillPath: "/nQRMX614zn7XsykScu1uvAEbVwq.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
