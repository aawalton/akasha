import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS02e04 = {
  id: "01a18881-51a0-7539-9797-b60eb5520884",
  type: "page-type/episode",
  slug: "white-collar-s02e04",
  description:
    "When Mozzie believes someone he cares about has been kidnapped, he turns to Peter and Neal for help.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/white-collar-season-2"],
  position: 4,
  publishedAt: "2010-08-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596262",
      externalLink: "https://www.themoviedb.org/tv/21510/season/2/episode/4",
    },
  ],
  title: "By the Book",
  episodeType: "standard",
  stillPath: "/2Oyrssi7JOsjT0QT7oSlpLOzejs.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
