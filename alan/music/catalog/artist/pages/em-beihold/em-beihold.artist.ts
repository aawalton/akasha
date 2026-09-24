import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const emBeihold = {
  id: "019ea4de-c59b-742c-ad28-1df0d95fbb6b",
  type: "page-type/artist",
  slug: "em-beihold",
  grade: "S-",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  status: "following",
  tags: ["Indie Pop Storyteller"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7575e3b8-ba04-4acc-a895-9cc528f86525",
      externalLink: "https://musicbrainz.org/artist/7575e3b8-ba04-4acc-a895-9cc528f86525",
      lastSyncedAt: "2026-06-08",
    },
    {
      source: "spotify",
      externalId: "7o2ZQYM7nTsaVdkXY38UAA",
      externalLink: "https://open.spotify.com/artist/7o2ZQYM7nTsaVdkXY38UAA",
      lastSyncedAt: "2026-09-24",
    },
  ],
  title: "Em Beihold",
  genre: ["pop", "singer-songwriter", "teen pop"],
  reaction: "txt",
} as const satisfies Artist
