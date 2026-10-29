import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS05e03 = {
  id: "01a18853-690d-7a24-94bf-ad997ac40391",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s05e03",
  description:
    "Stardate: 45076.3. Picard exposes a planned genocidal attack on the Bajorans with the help of a new officer, Ensign Ro Laren.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-5"],
  position: 3,
  publishedAt: "1991-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37134",
      externalLink: "https://www.themoviedb.org/tv/655/season/5/episode/3",
    },
  ],
  title: "Ensign Ro",
  episodeType: "standard",
  stillPath: "/rEwFLjLyowIAK97cSajFt9JaPLc.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
