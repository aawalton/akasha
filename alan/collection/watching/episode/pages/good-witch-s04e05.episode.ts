import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS04e05 = {
  id: "01a18849-3529-798d-921f-dbe266db449b",
  type: "page-type/episode",
  slug: "good-witch-s04e05",
  description:
    "Grace finds herself under the spell of Elizabeth Merriwick after Cassie discovers an old trunk filled with her vintage clothing. Inspired by its history, and tapping into her Merriwick heritage, Grace finds a passion for storytelling. Meanwhile, Cassie helps a mother and daughter reconnect over their past at Grey House.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-4"],
  position: 5,
  publishedAt: "2018-05-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1487324",
      externalLink: "https://www.themoviedb.org/tv/61864/season/4/episode/5",
    },
  ],
  title: "Written Like a Merriwick",
  episodeType: "standard",
  stillPath: "/vcwX172gQixET3bmsyw2fxpnORG.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
