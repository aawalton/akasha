import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const alexandria = {
  id: "01a06803-676a-7002-8418-2032b4c04d13",
  type: "page-type/artist",
  slug: "alexandria",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "A",
  status: "following",
  tags: ["Celtic"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "45ac08ff-e04c-492c-b9f6-6604f778740e",
      externalLink: "https://musicbrainz.org/artist/45ac08ff-e04c-492c-b9f6-6604f778740e",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "0SQG4wPVUlfbmbGQfqB47y",
      externalLink: "https://open.spotify.com/artist/0SQG4wPVUlfbmbGQfqB47y",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Alexandria",
  genre: ["gothic metal", "metal", "symphonic metal"],
} as const satisfies Artist
