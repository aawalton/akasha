import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const emBeihold = {
  id: "019ea4de-c59b-742c-ad28-1df0d95fbb6b",
  type: "artist",
  slug: "em-beihold",
  title: "Em Beihold",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  genre: ["pop", "singer-songwriter", "teen pop"],
  rank: "S-",
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
      lastSyncedAt: "2026-03-09",
    },
  ],
  tags: ["Indie Pop Storyteller"],
  reaction: "txt",
} as const satisfies Artist
