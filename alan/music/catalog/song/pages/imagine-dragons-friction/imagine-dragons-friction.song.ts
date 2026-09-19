import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsFriction = {
  id: "019ea497-8f51-7bcd-82d9-77b26491eea8",
  type: "page-type/song",
  slug: "imagine-dragons-friction",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3e7a029b-1a07-444c-828f-077e4e0ad223",
      externalLink: "https://musicbrainz.org/work/3e7a029b-1a07-444c-828f-077e4e0ad223",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Friction",
  artist: "artist/imagine-dragons",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
