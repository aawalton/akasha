import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const steinsGateS01e01 = {
  id: "01a183d4-f6a6-70c7-976d-e67af7484744",
  type: "page-type/episode",
  slug: "steins-gate-s01e01",
  description:
    "A self-described mad scientist attends a lecture on time travel, stumbles upon the dead body of a familiarly unfamiliar woman, and discovers that his text messages are no longer bound by the rules of space and time.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/steins-gate-season-1"],
  position: 1,
  publishedAt: "2011-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "880884",
      externalLink: "https://www.themoviedb.org/tv/42509/season/1/episode/1",
    },
  ],
  title: "Turning Point",
  episodeType: "standard",
  stillPath: "/gPZXNWR7WuUgMZ9x6hwIZPRLbna.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-28T18:45:34.502Z",
  updatedAt: "2026-10-28T18:45:34.502Z",
} as const satisfies Episode
