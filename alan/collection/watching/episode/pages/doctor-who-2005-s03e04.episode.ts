import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const doctorWho2005S03e04 = {
  id: "01a18883-f214-779f-99b1-319493a53c9a",
  type: "page-type/episode",
  slug: "doctor-who-2005-s03e04",
  description:
    "The Doctor investigates disappearances in New York at the height of the depression in the 1930s. Nefarious Pig Men linger in the sewers and the Daleks prepare an audacious plan at the top of the Empire State Building",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/doctor-who-season-3"],
  position: 4,
  publishedAt: "2007-04-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "941494",
      externalLink: "https://www.themoviedb.org/tv/57243/season/3/episode/4",
    },
  ],
  title: "Daleks in Manhattan (1)",
  episodeType: "standard",
  stillPath: "/9QkR09kEpAOpF2QpNJHUoNscnY0.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:35:10.995Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Episode
