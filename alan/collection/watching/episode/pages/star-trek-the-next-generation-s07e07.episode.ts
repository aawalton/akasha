import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS07e07 = {
  id: "01a18853-6910-707a-96df-ec9b70cbb540",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s07e07",
  description:
    "Stardate: 47254.1. Lwaxana Troi collapses with a repressed memory related illness. Her only chance for survival is if Deanna can probe her subconscious and find out what is killing her. However, the secret Lwaxana holds is deeper than Deanna imagined.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-7"],
  position: 7,
  publishedAt: "1993-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37190",
      externalLink: "https://www.themoviedb.org/tv/655/season/7/episode/7",
    },
  ],
  title: "Dark Page",
  episodeType: "standard",
  stillPath: "/lKQRIcHZZ3flssojrisPa636NfZ.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
