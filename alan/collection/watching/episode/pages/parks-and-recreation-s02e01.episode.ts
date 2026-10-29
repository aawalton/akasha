import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const parksAndRecreationS02e01 = {
  id: "01a18850-f8ba-72ac-9e61-97296fd89b26",
  type: "page-type/episode",
  slug: "parks-and-recreation-s02e01",
  description:
    "When Leslie decides to marry two penguins to promote the local zoo, she inadvertently causes an uproar when both penguins turn out to be male. Meanwhile, Mark puts Ann in an awkward situation when he asks her to go see a movie.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/parks-and-recreation-season-2"],
  position: 1,
  publishedAt: "2009-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "397629",
      externalLink: "https://www.themoviedb.org/tv/8592/season/2/episode/1",
    },
  ],
  title: "Pawnee Zoo",
  episodeType: "standard",
  stillPath: "/lbIWkp4EbufbYANarxW4LmkTPN7.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:39:30.361Z",
  updatedAt: "2026-10-29T15:39:30.361Z",
} as const satisfies Episode
