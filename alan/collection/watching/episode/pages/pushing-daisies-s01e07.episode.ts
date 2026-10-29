import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const pushingDaisiesS01e07 = {
  id: "01a1887f-251c-7648-b0d8-ab3479bf296f",
  type: "page-type/episode",
  slug: "pushing-daisies-s01e07",
  description:
    "Ned, Emerson, and Chuck's next case involves an olfactory assistant who was killed when her scratch-'n'-sniff book combusted.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/pushing-daisies-season-1"],
  position: 7,
  publishedAt: "2007-11-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "364446",
      externalLink: "https://www.themoviedb.org/tv/5639/season/1/episode/7",
    },
  ],
  title: "Smell of Success",
  episodeType: "standard",
  stillPath: "/830RfAzygksrgLkN5hSf3Y8Tfv8.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:29:56.379Z",
  updatedAt: "2026-10-29T16:29:56.379Z",
} as const satisfies Episode
