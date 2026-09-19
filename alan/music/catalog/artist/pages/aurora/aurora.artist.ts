import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const aurora = {
  id: "019ea4a2-bf94-7e76-9b55-055406f66eb9",
  type: "page-type/artist",
  slug: "aurora",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "A+",
  status: "following",
  tags: ["Indie Pop Storyteller"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "484a4e90-6899-4e4b-a948-a2255d365340",
      externalLink: "https://musicbrainz.org/artist/484a4e90-6899-4e4b-a948-a2255d365340",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "1WgXqy2Dd70QQOU7Ay074N",
      externalLink: "https://open.spotify.com/artist/1WgXqy2Dd70QQOU7Ay074N",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "AURORA",
  genre: [
    "indie pop",
    "art pop",
    "dream pop",
    "folktronica",
    "chamber pop",
    "pop",
    "synth-pop",
    "alternative dance",
  ],
  reaction: "txt",
} as const satisfies Artist
