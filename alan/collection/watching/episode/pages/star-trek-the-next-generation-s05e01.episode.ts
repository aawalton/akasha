import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS05e01 = {
  id: "01a18853-690d-7307-98ec-65ad59c53dda",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s05e01",
  description:
    "Stardate: 45020.4. Picard suspects a Romulan influence in the recent Klingon civil war, and must force the Federation to intervene before the Empire collapses.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-5"],
  position: 1,
  publishedAt: "1991-09-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37157",
      externalLink: "https://www.themoviedb.org/tv/655/season/5/episode/1",
    },
  ],
  title: "Redemption (2)",
  episodeType: "standard",
  stillPath: "/1ZDUCGay2nMpi0YfqGoiJf23l6I.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
