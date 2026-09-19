import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraLucky = {
  id: "019ea4a3-1a69-7a6e-96ec-89b38689d246",
  type: "page-type/song",
  slug: "aurora-lucky",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0e24cbef-6442-4e21-998d-ab1d08b795ed",
      externalLink: "https://musicbrainz.org/work/0e24cbef-6442-4e21-998d-ab1d08b795ed",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lucky",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
