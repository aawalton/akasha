import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS02e10 = {
  id: "01a18851-3df4-7296-ab10-f198a9894d11",
  type: "page-type/episode",
  slug: "person-of-interest-s02e10",
  description:
    'As the FBI pursues "the man in the suit," Reese is even more determined to protect the latest person of interest after learning she is the sister of a soldier who was killed in action.',
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-2"],
  position: 10,
  publishedAt: "2012-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64087",
      externalLink: "https://www.themoviedb.org/tv/1411/season/2/episode/10",
    },
  ],
  title: "Shadow Box",
  episodeType: "mid-season",
  stillPath: "/bHAtb3ZD9Ojywh3g4uO8empBmOv.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
