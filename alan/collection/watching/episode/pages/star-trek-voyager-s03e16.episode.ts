import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e16 = {
  id: "01a18853-ac8c-76c3-af3e-d85c586133cb",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e16",
  description:
    "Stardate: 50537.2. Ensign Vorik expresses his desire to mate with B'Elanna during his Pon-Farr. After they get in a brawl over the matter, Torres begins showing signs of the Pon-Farr herself.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 16,
  publishedAt: "1997-02-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113132",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/16",
    },
  ],
  title: "Blood Fever",
  episodeType: "standard",
  stillPath: "/oRCGJjh79eiMvOMdpsAn6hHpd8i.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
