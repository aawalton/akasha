import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theLoneGunmen2001S01e13 = {
  id: "01a18880-39bf-73bc-a420-f22d9d3d82f3",
  type: "page-type/episode",
  slug: "the-lone-gunmen-2001-s01e13",
  description:
    "Langly's childhood hero, kid's show host Cap'n Toby, is accused of being an international spy. It's Gunmen to the rescue!",
  ownLength: 45,
  ownProgress: 45,
  partOfCollections: ["season/the-lone-gunmen-season-1"],
  position: 13,
  publishedAt: "2001-06-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "366710",
      externalLink: "https://www.themoviedb.org/tv/5715/season/1/episode/13",
    },
  ],
  title: "The Cap'n Toby Show",
  episodeType: "standard",
  stillPath: "/8PdwBnXc5lpp39v75RAB6yUN2gN.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T16:31:07.198Z",
  updatedAt: "2026-10-29T16:31:07.198Z",
} as const satisfies Episode
