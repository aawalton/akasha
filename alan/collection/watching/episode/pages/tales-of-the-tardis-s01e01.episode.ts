import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const talesOfTheTardisS01e01 = {
  id: "01a18855-d686-7942-9776-75feed7876a4",
  type: "page-type/episode",
  slug: "tales-of-the-tardis-s01e01",
  description:
    "The Doctor and Tegan meet again and remember their terrifying adventure against the Cybermen to save the Earth… and the friend they lost along the way.",
  ownLength: 97,
  ownProgress: 0,
  partOfCollections: ["season/tales-of-the-tardis-season-1"],
  position: 1,
  publishedAt: "2023-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4876997",
      externalLink: "https://www.themoviedb.org/tv/238486/season/1/episode/1",
    },
  ],
  title: "Earthshock",
  episodeType: "standard",
  stillPath: "/1l9aAsETfaXxTqNI1fg5RfqoMZf.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:44:49.285Z",
  updatedAt: "2026-10-29T15:44:49.285Z",
} as const satisfies Episode
