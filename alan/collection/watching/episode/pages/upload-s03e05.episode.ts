import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS03e05 = {
  id: "01a18859-6798-74c7-a3ee-c07977cf8f74",
  type: "page-type/episode",
  slug: "upload-s03e05",
  description:
    "Nathan teams up with his own copy to save Luke, but Nora is discovered by the conspiracy.",
  ownLength: 31,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-3"],
  position: 5,
  publishedAt: "2023-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4670015",
      externalLink: "https://www.themoviedb.org/tv/86248/season/3/episode/5",
    },
  ],
  title: "Rescue Mission",
  episodeType: "standard",
  stillPath: "/4Ka09bfu7OLKRKeltTryMX9KuJ4.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
