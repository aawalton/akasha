import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const freeS01e01 = {
  id: "01a183d7-ce6a-7345-9736-27f79ab2165b",
  type: "page-type/episode",
  slug: "free-s01e01",
  description:
    "After spending their first year of high school in peace and quiet, Haruka and Makoto run into Nagisa, a new student who was a member at a swimming club with them when they were kids.  That swimming club is being torn down, so the three of them sneak in to dig up a time capsule that they buried in the back, which is when they are reunited with Rin, the fourth member of their group who left to study abroad.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/free-season-1"],
  position: 1,
  publishedAt: "2013-07-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1011034",
      externalLink: "https://www.themoviedb.org/tv/61456/season/1/episode/1",
    },
  ],
  title: "Reunion at the Starting Block!",
  episodeType: "standard",
  stillPath: "/h1NcBoUIwG0uFHt2887RevtIrDG.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-28T18:48:40.810Z",
  updatedAt: "2026-10-28T18:48:40.810Z",
} as const satisfies Episode
