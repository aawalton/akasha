import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS06e03 = {
  id: "01a18853-690f-7e5c-bb6c-efed9bbe0ed0",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s06e03",
  description:
    "Stardate: 46071.6. Deanna becomes attracted to an alien ambassador. Shortly thereafter, she starts ageing rapidly and starts becoming violent.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-6"],
  position: 3,
  publishedAt: "1992-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37160",
      externalLink: "https://www.themoviedb.org/tv/655/season/6/episode/3",
    },
  ],
  title: "Man of the People",
  episodeType: "standard",
  stillPath: "/22e7ajBLD3MQQimxKNZrBVirgGk.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
