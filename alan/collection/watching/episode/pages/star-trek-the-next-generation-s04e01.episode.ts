import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS04e01 = {
  id: "01a18884-b709-7f76-b2fe-4b0612e4206e",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s04e01",
  description:
    "Stardate: 44001.4. Riker must pull out all the stops in order to save Earth from a Borg invasion being lead by none other than Locutus - otherwise known as Captain Jean-Luc Picard.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-4"],
  position: 1,
  publishedAt: "1990-09-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37130",
      externalLink: "https://www.themoviedb.org/tv/655/season/4/episode/1",
    },
  ],
  title: "The Best of Both Worlds (2)",
  episodeType: "standard",
  stillPath: "/xcfWEHsOe9qCxheSjHu0GYvfrE5.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
