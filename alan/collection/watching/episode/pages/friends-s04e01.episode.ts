import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS04e01 = {
  id: "01a18848-c2bd-7c3b-ac6f-4e7d77c6ba5f",
  type: "page-type/episode",
  slug: "friends-s04e01",
  description:
    "Ross chooses between Rachel and his bald-headed girlfriend Bonnie. Phoebe struggles to deal with the revelation that her mother's friend is actually her mother. Monica gets stung by a jellyfish, forcing Chandler and Joey to step up to the plate in order to relieve her pain.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-4"],
  position: 1,
  publishedAt: "1997-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86528",
      externalLink: "https://www.themoviedb.org/tv/1668/season/4/episode/1",
    },
  ],
  title: "The One with the Jellyfish",
  episodeType: "standard",
  stillPath: "/67tiGi36IUXlNAPlPJy98INk2DQ.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
