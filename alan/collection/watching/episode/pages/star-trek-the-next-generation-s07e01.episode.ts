import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS07e01 = {
  id: "01a18853-6910-7c9f-9247-e5586fd1d5f5",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s07e01",
  description:
    "Stardate: 47025.4. Data abducts Picard, Troi and Geordi and holds them prisoners of the Borg, while he derives pleasure from being evil. Dr. Crusher is left in command of the Enterprise as it comes under attack from a Borg vessel.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-7"],
  position: 1,
  publishedAt: "1993-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37184",
      externalLink: "https://www.themoviedb.org/tv/655/season/7/episode/1",
    },
  ],
  title: "Descent (2)",
  episodeType: "standard",
  stillPath: "/5nx4uuNdT7qw1QmxuHMFDSluADo.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
