import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS06e02 = {
  id: "01a18849-352a-7538-aa48-9056c383df19",
  type: "page-type/episode",
  slug: "good-witch-s06e02",
  description:
    "Cassie judges Middleton’s chili cook-off, which brings out fierce competition among residents, including Sam. Martha receives unexpected competition in her once-uncontested run for re-election. Cassie unearths a time capsule that reveals information about her current Grey House guest’s background.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-6"],
  position: 2,
  publishedAt: "2020-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2234087",
      externalLink: "https://www.themoviedb.org/tv/61864/season/6/episode/2",
    },
  ],
  title: "The Chili",
  episodeType: "standard",
  stillPath: "/qtLNXPX3jDg3raluWqqYyM0z7Q1.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
