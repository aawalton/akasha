import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e06 = {
  id: "01a18848-c2bb-7dd3-8ae2-32ec194a750a",
  type: "page-type/episode",
  slug: "friends-s03e06",
  description:
    "When Janice asks the gang if any of them have ever slept together, the friends flash back to a time three years before.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 6,
  publishedAt: "1996-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86281",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/6",
    },
  ],
  title: "The One with the Flashback",
  episodeType: "standard",
  stillPath: "/vAVRp4FQO858ZurhMkjy2Ry8BbM.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
