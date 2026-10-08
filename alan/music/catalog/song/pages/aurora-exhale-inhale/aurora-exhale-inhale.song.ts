import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraExhaleInhale = {
  id: "019ea4a5-6e37-766c-a765-8401051f8a92",
  type: "page-type/song",
  slug: "aurora-exhale-inhale",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "63dad61b-fc9d-46ae-bc91-54c4d322c064",
      externalLink: "https://musicbrainz.org/work/63dad61b-fc9d-46ae-bc91-54c4d322c064",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Exhale Inhale",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:32:45.623Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
