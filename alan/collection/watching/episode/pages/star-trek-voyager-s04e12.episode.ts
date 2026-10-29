import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e12 = {
  id: "01a18853-ac8e-7f96-b49a-6696b8a8da6e",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e12",
  description:
    "Stardate: 51449.2. Neelix is killed during an away mission, but Seven of Nine is able to revive him using Borg technology, leading him into a crisis of faith regarding the afterlife.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 12,
  publishedAt: "1997-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113169",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/12",
    },
  ],
  title: "Mortal Coil",
  episodeType: "standard",
  stillPath: "/to0u9VWK2V43MVMfVmqHaZBvkE1.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
