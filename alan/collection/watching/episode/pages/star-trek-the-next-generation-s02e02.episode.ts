import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS02e02 = {
  id: "01a18884-b706-729c-8db6-dc2b6443c81c",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s02e02",
  description:
    "Stardate: 42193.6. A mysterious life form known as the 'Nagilum' threatens the life of the crew in his attempt to understand humanity.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-2"],
  position: 2,
  publishedAt: "1988-11-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37087",
      externalLink: "https://www.themoviedb.org/tv/655/season/2/episode/2",
    },
  ],
  title: "Where Silence Has Lease",
  episodeType: "standard",
  stillPath: "/ckD1WFbehdYqi6SJfQUW5y4AxdA.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
