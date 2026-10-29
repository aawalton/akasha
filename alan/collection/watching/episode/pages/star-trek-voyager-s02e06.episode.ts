import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e06 = {
  id: "01a18853-ac8a-7730-b802-0f1dce4bbe00",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e06",
  description:
    "Stardate: Unknown. Voyager enters a spatial distortion ring, which causes the ship’s layout to shift in confusing ways.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 6,
  publishedAt: "1995-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112972",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/6",
    },
  ],
  title: "Twisted",
  episodeType: "standard",
  stillPath: "/ikv5yYuZ4xh1mZKuSlZYjNnzeKz.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
