import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e15 = {
  id: "01a18853-1b88-77ca-a674-1e02749fe56c",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e15",
  description:
    "Trapped in the Neutral Zone, the crew encounters a rogue geneticist who sheds light on Dal’s past.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 15,
  publishedAt: "2022-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3983095",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/15",
    },
  ],
  title: "Masquerade",
  episodeType: "standard",
  stillPath: "/8nNUqKfp5BA2ZDvXcQkArBLjZhJ.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
