import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS04e05 = {
  id: "01a1887e-1e40-7bce-8c07-9ad038260117",
  type: "page-type/episode",
  slug: "castle-s04e05",
  description:
    "A wealthy museum patron is a suspect when a valuable sculpture is stolen. Castle and Beckett investigate the theft with the help of an insurance investigator who sets her sights on Castle.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-4"],
  position: 5,
  publishedAt: "2011-10-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64845",
      externalLink: "https://www.themoviedb.org/tv/1419/season/4/episode/5",
    },
  ],
  title: "Eye of the Beholder",
  episodeType: "standard",
  stillPath: "/8cDSGQZ6ziVRy2VQb79eF0zzb2P.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
