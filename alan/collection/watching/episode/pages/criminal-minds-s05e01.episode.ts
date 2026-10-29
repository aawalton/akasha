import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS05e01 = {
  id: "01a18844-d7eb-7757-b1ab-1ff822dabfe7",
  type: "page-type/episode",
  slug: "criminal-minds-s05e01",
  description:
    "As Rossi, Morgan and JJ profile a killer who is targeting an emergency room doctor, Prentiss realizes that Hotch is missing.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-5"],
  position: 1,
  publishedAt: "2009-09-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283286",
      externalLink: "https://www.themoviedb.org/tv/4057/season/5/episode/1",
    },
  ],
  title: "Nameless, Faceless",
  episodeType: "standard",
  stillPath: "/Cqc30tsxumKZ2iJBjgRNRbvaEP.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
