import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackbeardS01e01 = {
  id: "01a18843-a12b-7c29-9250-8a58858706b5",
  type: "page-type/episode",
  slug: "blackbeard-s01e01",
  description:
    "Bristol, England, 1717. In order to restore safe passage to the sea lanes, Lieutenant Robert Maynard of the Royal Navy scouts the seas and offers amnesty to all pirates who choose to give up their evil ways and banish the criminals from the hundreds of islands they occupy. An imposing force, Maynard meets his match, a pirate sailing off the Island of St. Vincent: Edward Teach also known as Blackbeard.",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["season/blackbeard-season-1"],
  position: 1,
  publishedAt: "2006-06-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1340133",
      externalLink: "https://www.themoviedb.org/tv/72954/season/1/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  stillPath: "/tidfLHxnepZjUQOvDdYJ5sItTrz.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:24:55.979Z",
  updatedAt: "2026-10-29T15:24:55.979Z",
} as const satisfies Episode
