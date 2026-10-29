import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekStrangeNewWorldsS01e01 = {
  id: "01a18853-4345-728a-8118-b8f0d78e3c6e",
  type: "page-type/episode",
  slug: "star-trek-strange-new-worlds-s01e01",
  description:
    "When one of Pike’s officers goes missing while on a secret mission for Starfleet, Pike has to come out of self-imposed exile. He must navigate how to rescue his officer, while struggling with what to do with the vision of the future he’s been given.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-strange-new-worlds-season-1"],
  position: 1,
  publishedAt: "2022-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3455959",
      externalLink: "https://www.themoviedb.org/tv/103516/season/1/episode/1",
    },
  ],
  title: "Strange New Worlds",
  episodeType: "standard",
  stillPath: "/iU2g0Ms11BZKX6i1KxHJUfnmCXf.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:00.517Z",
  updatedAt: "2026-10-29T15:42:00.517Z",
} as const satisfies Episode
