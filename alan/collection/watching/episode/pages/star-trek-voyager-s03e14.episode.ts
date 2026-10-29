import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e14 = {
  id: "01a18853-ac8c-76cf-a01f-79044093feee",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e14",
  description:
    "Stardate: 50460.3. Ensign Kim asks for Tuvok’s help controlling his emotions when he finds himself desperately in love with a holodeck character.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 14,
  publishedAt: "1997-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113130",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/14",
    },
  ],
  title: "Alter Ego",
  episodeType: "standard",
  stillPath: "/2ehgIe1rYE2x5yRzNuSoePtJ3L6.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
