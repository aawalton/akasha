import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS07e02 = {
  id: "01a18853-6910-7889-8b6e-c6063de715ab",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s07e02",
  description:
    "Stardate: Unknown. During an exchange program, Picard's shuttle crashes on an unknown planet where he is rescued by the sole survivor of another crash.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-7"],
  position: 2,
  publishedAt: "1993-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37185",
      externalLink: "https://www.themoviedb.org/tv/655/season/7/episode/2",
    },
  ],
  title: "Liaisons",
  episodeType: "standard",
  stillPath: "/1ruclbBDrgZV8crCokjC0AlG1py.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
