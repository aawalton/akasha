import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e08 = {
  id: "01a18852-d432-7e80-8917-1bd6964b765b",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e08",
  description:
    "A spatial distortion leaves Archer unable to form any new long-term memories. Years in the future, he wakes up one morning and is stunned to learn the outcome of the human-Xindi conflict.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 8,
  publishedAt: "2003-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15606",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/8",
    },
  ],
  title: "Twilight",
  episodeType: "standard",
  stillPath: "/waq0aN2528cyrXMLwtMqAilgp5A.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
