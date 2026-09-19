import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraInAMinute = {
  id: "019ea4a5-6467-7e22-9941-ec4b1128a9f7",
  type: "page-type/song",
  slug: "aurora-in-a-minute",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "63d05f11-9a9d-467a-9493-cc638891e343",
      externalLink: "https://musicbrainz.org/work/63d05f11-9a9d-467a-9493-cc638891e343",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "IN A MINUTE",
  artist: "artist/aurora",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
