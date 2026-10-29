import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theLegendOfKorraS02e12 = {
  id: "01a18857-4fe4-71a7-a240-c3fba4ea363d",
  type: "page-type/episode",
  slug: "the-legend-of-korra-s02e12",
  description: "Korra and company attempt to close the spirit portals before Harmonic Convergence.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/book-two-spirits"],
  position: 12,
  publishedAt: "2013-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968683",
      externalLink: "https://www.themoviedb.org/tv/33880/season/2/episode/12",
    },
  ],
  title: "Harmonic Convergence",
  episodeType: "standard",
  stillPath: "/fJ6x70fg6uJpc1hyCFL2Zvb08Tf.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:25.891Z",
  updatedAt: "2026-10-29T15:46:25.891Z",
} as const satisfies Episode
