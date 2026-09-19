import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const sabrinaCarpenter = {
  id: "01a06803-676c-7007-ad42-2732899cfd52",
  type: "page-type/artist",
  slug: "sabrina-carpenter",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "B",
  status: "following",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1882fe91-cdd9-49c9-9956-8e06a3810bd4",
      externalLink: "https://musicbrainz.org/artist/1882fe91-cdd9-49c9-9956-8e06a3810bd4",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "74KM79TiuVKeVCqs8QtB0B",
      externalLink: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Sabrina Carpenter",
  genre: ["pop", "dance-pop", "electropop"],
} as const satisfies Artist
