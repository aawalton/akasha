import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e01 = {
  id: "01a1884b-ef81-7aa3-ad75-a52a50e8516e",
  type: "page-type/episode",
  slug: "ncis-s20e01",
  description:
    "Special Agent Alden Parker is still on the run with his ex-wife Vivian, so the team investigates who from his past might have a personal vendetta against him in hopes of clearing Parker's name.\n\nThe crossover continues on NCIS: Hawai'i S02E01 Prisoners' Dilemma (II).",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 1,
  publishedAt: "2022-09-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3800835",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/1",
    },
  ],
  title: "A Family Matter (I)",
  episodeType: "standard",
  stillPath: "/mMhS4UEdVheJ6ZKpz3hoGarIazd.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
