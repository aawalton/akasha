import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraIWentTooFar = {
  id: "019ea4a3-711d-78aa-a126-52d9d5524950",
  type: "page-type/song",
  slug: "aurora-i-went-too-far",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1540738c-a75f-4e63-8b38-b0757366514b",
      externalLink: "https://musicbrainz.org/work/1540738c-a75f-4e63-8b38-b0757366514b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Went Too Far",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
