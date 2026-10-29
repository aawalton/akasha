import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS08e01 = {
  id: "01a18844-d7ef-7502-a178-b0f9f3aff2b2",
  type: "page-type/episode",
  slug: "criminal-minds-s08e01",
  description:
    'When a Texas prisoner escapes during a transfer, he leaves behind victims with his unique trademark, sewing their mouths shut, a signature the BAU remembers as unique to the UnSub "The Silencer." While they investigate who he was and who he\'s become, the BAU also gets to know the newest member of the team.',
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-8"],
  position: 1,
  publishedAt: "2012-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283384",
      externalLink: "https://www.themoviedb.org/tv/4057/season/8/episode/1",
    },
  ],
  title: "The Silencer",
  episodeType: "standard",
  stillPath: "/pZ03oWQu1jvpJMYsPpLTwGRfOZ6.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
