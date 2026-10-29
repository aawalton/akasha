import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS07e11 = {
  id: "01a18853-6910-726f-8e53-ef52b4d506f4",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s07e11",
  description:
    "Stardate: 47391.2. Worf returns from a Klingon competition to find that he is shifting through different realities.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-7"],
  position: 11,
  publishedAt: "1993-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37194",
      externalLink: "https://www.themoviedb.org/tv/655/season/7/episode/11",
    },
  ],
  title: "Parallels",
  episodeType: "standard",
  stillPath: "/zIQ4EmUGxpw0CIStZntF1X2EfEe.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
