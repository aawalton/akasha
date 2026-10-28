import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackButlerS02e01 = {
  id: "01a183d8-99a6-7603-af4a-e5c7be6795ef",
  type: "page-type/episode",
  slug: "black-butler-s02e01",
  description:
    "Devilish butler Claude and his young master Alois must outwit a priest, a viscount, and a conniving uncle with an eye on the family fortune. As if that weren’t excitement enough for one day, a mysterious guest pays a visit to the mansion.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-butler-season-2"],
  position: 1,
  publishedAt: "2010-07-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "919041",
      externalLink: "https://www.themoviedb.org/tv/50712/season/2/episode/1",
    },
  ],
  title: "Clawed Butler",
  episodeType: "standard",
  stillPath: "/v5WbuxDjus63F2Y43gsTKBEHkk4.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Episode
