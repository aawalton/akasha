import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e06 = {
  id: "01a1887f-e188-7d43-8381-268aa35c710f",
  type: "page-type/episode",
  slug: "star-trek-2-s02e06",
  description:
    "The starship Enterprise and its heavily-damaged sister ship, the USS Constellation, must work together to stop an alien planet-killing machine headed for the heart of Federation territory.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-2"],
  position: 6,
  publishedAt: "1967-10-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13988",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/6",
    },
  ],
  title: "The Doomsday Machine",
  episodeType: "standard",
  stillPath: "/pe4ANMS8KT6bkzdFSQX2KTueJLW.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
