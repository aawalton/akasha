import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e20 = {
  id: "01a18853-ac91-71ee-be97-ace544470537",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e20",
  description:
    "Stardate: Unknown. Captain Janeway takes three crewmen with poor performance records on an away mission in the Delta Flyer in an attempt to bring them to Starfleet standards. However, an unexpected collision with a Dark Matter comet leaves the crew in a perilous situation.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 20,
  publishedAt: "2000-03-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113354",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/20",
    },
  ],
  title: "Good Shepherd",
  episodeType: "standard",
  stillPath: "/kt9nfuAq7tsQKJ42XZp9pO5CeEC.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
