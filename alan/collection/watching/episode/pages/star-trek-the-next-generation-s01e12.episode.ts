import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS01e12 = {
  id: "01a18884-b705-7fd5-ac42-2f659d260b73",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s01e12",
  description:
    "Stardate: 41242.4.  While exploring his homeworld, the crew of the Enterprise find android parts that are identical to Data's. When assembled, an 'evil' twin of Data named Lore is revived.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-1"],
  position: 12,
  publishedAt: "1988-01-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37074",
      externalLink: "https://www.themoviedb.org/tv/655/season/1/episode/12",
    },
  ],
  title: "Datalore",
  episodeType: "standard",
  stillPath: "/rCTtAQaHRMPDFNft1UgiXJHPNeo.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
