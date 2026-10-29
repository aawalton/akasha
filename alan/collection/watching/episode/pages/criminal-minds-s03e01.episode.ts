import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS03e01 = {
  id: "01a18844-d7e8-75bb-906b-d17e25460d26",
  type: "page-type/episode",
  slug: "criminal-minds-s03e01",
  description:
    "The team investigates a serial killer who is targeting women at a small college in Flagstaff, Arizona. The BAU shuts down the campus, creates a detailed profile of the unsub, and arrests a suspect. However, the team members begin to have doubts about themselves when another woman is killed while the suspect is in custody.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-3"],
  position: 1,
  publishedAt: "2007-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283175",
      externalLink: "https://www.themoviedb.org/tv/4057/season/3/episode/1",
    },
  ],
  title: "Doubt",
  episodeType: "standard",
  stillPath: "/cyOtkjoMxS0BL2MoTcJx0X9mcJh.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
