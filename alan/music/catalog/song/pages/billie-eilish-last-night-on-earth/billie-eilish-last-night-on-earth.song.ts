import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishLastNightOnEarth = {
  id: "019ea4ac-3bfa-7536-958d-8fdce6387a07",
  type: "page-type/song",
  slug: "billie-eilish-last-night-on-earth",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f92ce0f8-c077-3ded-a787-ca6b43e146b5",
      externalLink: "https://musicbrainz.org/work/f92ce0f8-c077-3ded-a787-ca6b43e146b5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Last Night on Earth",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
