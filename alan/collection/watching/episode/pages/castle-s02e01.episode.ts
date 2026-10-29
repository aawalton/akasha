import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS02e01 = {
  id: "01a1887e-1e3d-78eb-8dd9-b5d2126a6972",
  type: "page-type/episode",
  slug: "castle-s02e01",
  description:
    "When the new season begins, Castle is wrestling with how to repair his relationship with Beckett, while struggling to finish his soon-to-be-published bestseller, Heat Wave. But circumstances force the pair back together to investigate the mysterious murder of a man found dead, tangled in the limbs of a tree.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/castle-season-2"],
  position: 1,
  publishedAt: "2009-09-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64783",
      externalLink: "https://www.themoviedb.org/tv/1419/season/2/episode/1",
    },
  ],
  title: "Deep in Death",
  episodeType: "standard",
  stillPath: "/vHq8CDXCnpK1IWvorqeK8zQ74tn.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
