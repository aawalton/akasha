import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS10e08 = {
  id: "01a18885-00ff-7907-a3cc-30e1e401c792",
  type: "page-type/episode",
  slug: "studio-c-s10e08",
  description:
    "Grandpa Joe turns on everyone when Charlie invites him to Wonka's Chocolate Factory. Mary Poppins is hired by the Banks children to work in their office. And Chopin's “Prelude in E minor” is performed on a stylophone.",
  ownLength: 26,
  ownProgress: 26,
  partOfCollections: ["season/studio-c-season-10"],
  position: 8,
  publishedAt: "2019-11-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1969539",
      externalLink: "https://www.themoviedb.org/tv/68207/season/10/episode/8",
    },
  ],
  title: "Season 10 Episode 8",
  episodeType: "standard",
  stillPath: "/ekrPwZDr2TCBo3nYjIFqNVfQ5CS.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
