import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const fairyTailS04e01 = {
  id: "01a183d7-2656-7305-a114-078ef173f06b",
  type: "page-type/episode",
  slug: "fairy-tail-s04e01",
  description:
    "Legion pays Fairy Tail a special visit! Fairy Tail learns of Sabertooth, the number one guild in Fiore! And what lies beneath the original Fairy Tail base of operations?!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/fairy-tail-season-4"],
  position: 1,
  publishedAt: "2012-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908168",
      externalLink: "https://www.themoviedb.org/tv/46261/season/4/episode/1",
    },
  ],
  title: "Sabertooth",
  episodeType: "standard",
  stillPath: "/hmoyOHsnCzHP5XFp7U36bFeBrwH.jpg",
  voteAverage: 9,
  createdAt: "2026-10-28T18:47:57.774Z",
  updatedAt: "2026-10-28T18:47:57.774Z",
} as const satisfies Episode
