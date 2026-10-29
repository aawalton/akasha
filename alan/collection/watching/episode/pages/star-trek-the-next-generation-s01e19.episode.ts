import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS01e19 = {
  id: "01a18884-b705-7593-9bac-fab925330898",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s01e19",
  description:
    "Stardate: 41503.7. Two Klingons, rescued by the Enterprise, try to take over the ship.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-1"],
  position: 19,
  publishedAt: "1988-03-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37060",
      externalLink: "https://www.themoviedb.org/tv/655/season/1/episode/19",
    },
  ],
  title: "Heart of Glory",
  episodeType: "standard",
  stillPath: "/nFsh5KFS5Wu53iwrrmN39D6sefm.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
