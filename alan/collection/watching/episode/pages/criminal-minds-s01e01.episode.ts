import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS01e01 = {
  id: "01a18883-a8ad-7013-b7e4-0581f772664c",
  type: "page-type/episode",
  slug: "criminal-minds-s01e01",
  description:
    "After a fourth woman goes missing in as many months, the team is brought in to track down the guy before he kidnaps again. Hotch is asked to secretly evaluate Gideon to see if he is ready to work full time again.",
  ownLength: 40,
  ownProgress: 40,
  partOfCollections: ["season/criminal-minds-season-1"],
  position: 1,
  publishedAt: "2005-09-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282843",
      externalLink: "https://www.themoviedb.org/tv/4057/season/1/episode/1",
    },
  ],
  title: "Extreme Aggressor",
  episodeType: "standard",
  stillPath: "/ap6KTZgsg94pdBLrwBJloVmrlLa.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
