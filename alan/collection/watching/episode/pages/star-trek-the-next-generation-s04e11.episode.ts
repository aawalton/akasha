import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS04e11 = {
  id: "01a18884-b709-7a3f-bdf3-deef8bcdf49b",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s04e11",
  description:
    "Stardate: 44356.9. A Vulcan Ambassador being escorted by the Enterprise starts exhibiting suspicious behavior. Miles O'Brien marries his fiancée, Keiko Ishikawa in Ten-Forward.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-4"],
  position: 11,
  publishedAt: "1991-01-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37115",
      externalLink: "https://www.themoviedb.org/tv/655/season/4/episode/11",
    },
  ],
  title: "Data's Day",
  episodeType: "standard",
  stillPath: "/5efgms5DvBeFas8pwJuqo9cK5Hi.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
