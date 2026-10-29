import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS03e07 = {
  id: "01a18856-986a-7d6e-b08d-ae595567f529",
  type: "page-type/episode",
  slug: "the-chosen-s03e07",
  description:
    '"Having ears to hear." Jesus leads the disciples into a dangerous region, where they will face a crowd armed with sharp tongues and dull ears… but even his closest followers are finding it very hard to hear.',
  ownLength: 64,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-3"],
  position: 7,
  publishedAt: "2023-02-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4153515",
      externalLink: "https://www.themoviedb.org/tv/85077/season/3/episode/7",
    },
  ],
  title: "Ears to Hear",
  episodeType: "standard",
  stillPath: "/nt5MxG1bUgkzMHzHqeFqyJxN6dI.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
