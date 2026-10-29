import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS07e10 = {
  id: "01a18853-6910-7125-bcc8-ec90e4b19f50",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s07e10",
  description:
    "Stardate: 47410.2. Data is disturbed by the claims of a woman who says she is Noonien Soong's ex-wife.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-7"],
  position: 10,
  publishedAt: "1993-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37193",
      externalLink: "https://www.themoviedb.org/tv/655/season/7/episode/10",
    },
  ],
  title: "Inheritance",
  episodeType: "standard",
  stillPath: "/9JAmD9pJ4K1NW01URIlhSwufJi7.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
